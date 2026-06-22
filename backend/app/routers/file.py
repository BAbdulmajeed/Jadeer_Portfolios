from fastapi import (
    APIRouter, 
    Depends, 
    HTTPException, 
    status, 
    UploadFile, 
    File
)
from sqlalchemy.orm import Session

from app.utils.database import get_db
from app import models
from app.schemas.file import FileResponse, FileUpdate
from app.utils.security import get_current_user
import os
import uuid
import aiofiles

router = APIRouter(prefix="/files", tags=["Files"])

# Upload directory
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Restrictions
MAX_FILE_SIZE = 20 * 1024 * 1024  # 20 MB

ALLOWED_TYPES = {
    # Images
    "image/jpeg", "image/png", "image/webp", "image/gif",
    # Documents
    "application/pdf", "text/plain",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
}

# ------------------------------------------------------------
# Upload File
# ------------------------------------------------------------
@router.post("/upload", response_model=FileResponse)
async def upload_file(
    portfolio_id: int,
    project_id: int | None = None,
    file_purpose: str = "other",
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    # Validate portfolio
    portfolio = db.query(models.Portfolio).filter(
        models.Portfolio.id == portfolio_id
    ).first()
    if not portfolio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Portfolio not found"
        )

    # Permission check point
    if current_user.id != portfolio.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to create this file"
        )

    # Validate MIME type
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file type: {file.content_type}"
        )

    # Generate unique filename for storage
    ext = os.path.splitext(file.filename)[1]
    unique_name = f"{uuid.uuid4()}{ext}"
    file_path = os.path.join(UPLOAD_DIR, unique_name)

    # Save file with size limit
    size = 0
    async with aiofiles.open(file_path, "wb") as out:
        while chunk := await file.read(1024 * 1024):
            size += len(chunk)
            if size > MAX_FILE_SIZE:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="File too large (max 20 MB)"
                )
            await out.write(chunk)

    # Create DB record
    new_file = models.File(
        portfolio_id=portfolio_id,
        project_id=project_id,
        file_purpose=file_purpose,
        file_name=file.filename,  # original name
        mime_type=file.content_type,
        storage_path=file_path,
        size_bytes=size
    )

    db.add(new_file)
    db.commit()
    db.refresh(new_file)

    return new_file


# ------------------------------------------------------------
# Get Portfolio Files (project_id IS NULL)
# ------------------------------------------------------------
@router.get("/portfolio/{portfolio_id}", response_model=list[FileResponse])
def get_portfolio_files(
    portfolio_id: int, 
    db: Session = Depends(get_db)
):
    files = db.query(models.File).filter(
        models.File.portfolio_id == portfolio_id,
        models.File.project_id == 0
    ).all()
    return files


# ------------------------------------------------------------
# Get Project Files
# ------------------------------------------------------------
@router.get("/project/{project_id}", response_model=list[FileResponse])
def get_project_files(
    project_id: int, 
    db: Session = Depends(get_db)
):
    files = db.query(models.File).filter(
        models.File.project_id == project_id
    ).all()
    return files


# ------------------------------------------------------------
# Get Single File
# ------------------------------------------------------------
@router.get("/{file_id}", response_model=FileResponse)
def get_file(
    file_id: int, 
    db: Session = Depends(get_db)
):
    file = db.query(models.File).filter(
        models.File.id == file_id
    ).first()

    if not file:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found"
        )

    return file


# ------------------------------------------------------------
# Update File (always replace file)
# ------------------------------------------------------------
@router.post("/{file_id}", response_model=FileResponse)
async def update_file(
    file_id: int,
    file_purpose: str = "other",
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    # Fetch old file
    old_file = db.query(models.File).filter(
        models.File.id == file_id
    ).first()

    portfolio_id = old_file.portfolio_id
    project_id = old_file.project_id

    if not old_file:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found"
        )

    # Validate portfolio (must match old file)
    portfolio = db.query(models.Portfolio).filter(
        models.Portfolio.id == old_file.portfolio_id
    ).first()

    if not portfolio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Portfolio not found"
        )

    # Permission check
    if current_user.id != portfolio.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to update this file"
        )

    # Validate MIME type
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file type: {file.content_type}"
        )

    # Save new file
    ext = os.path.splitext(file.filename)[1]
    unique_name = f"{uuid.uuid4()}{ext}"
    file_path = os.path.join(UPLOAD_DIR, unique_name)

    size = 0
    async with aiofiles.open(file_path, "wb") as out:
        while chunk := await file.read(1024 * 1024):
            size += len(chunk)
            if size > MAX_FILE_SIZE:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="File too large (max 20 MB)"
                )
            await out.write(chunk)

    # Delete old file from disk
    if os.path.exists(old_file.storage_path):
        os.remove(old_file.storage_path)

    # Update the existing DB row (NOT creating a new one)
    old_file.portfolio_id = portfolio_id
    old_file.project_id = project_id
    old_file.file_purpose = file_purpose
    old_file.file_name = file.filename
    old_file.mime_type = file.content_type
    old_file.storage_path = file_path
    old_file.size_bytes = size

    db.commit()
    db.refresh(old_file)

    return old_file


# ------------------------------------------------------------
# Delete File
# ------------------------------------------------------------
@router.delete("/{file_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_file(
    file_id: int, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    file = db.query(models.File).filter(
        models.File.id == file_id
    ).first()

    # Permission check point
    portfolio = db.query(models.Portfolio).filter(
        models.Portfolio.id == file.portfolio_id
    ).first()
    
    if current_user.id != portfolio.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to delete this file"
        )


    if not file:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found"
        )

    # Delete file from disk
    if os.path.exists(file.storage_path):
        os.remove(file.storage_path)

    db.delete(file)
    db.commit()

    return None
