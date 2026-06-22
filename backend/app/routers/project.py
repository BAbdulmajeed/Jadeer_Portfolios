# Import the required libraries
from fastapi import (
    APIRouter, 
    Depends, 
    HTTPException, 
    status
)
from sqlalchemy.orm import Session, joinedload
import os

# Import the required files
from app.utils.database import get_db
from app import models
from app.schemas.project import (
    ProjectCreate,
    ProjectUpdate,
    ProjectResponse,
)
from app.utils.security import get_current_user

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)

# ------------------------------------------------------------
# Create Project
# ------------------------------------------------------------
@router.post("/portfolio/{portfolio_id}", response_model=ProjectResponse)
def create_project(
    portfolio_id: int, 
    payload: ProjectCreate, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):

    # Ensure portfolio exists
    portfolio = db.query(models.Portfolio).filter(
        models.Portfolio.id == portfolio_id
    ).first()

    if not portfolio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Portfolio not found"
        )

    new_project = models.Project(
        portfolio_id=portfolio_id,
        title=payload.title,
        short_description=payload.short_description,
        full_description=payload.full_description,
        tags=payload.tags,
        is_published=payload.is_published,
        project_date=payload.project_date
    )

    # Permission check point
    if current_user.id != portfolio.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to view this project"
        )

    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return new_project


# ------------------------------------------------------------
# Get Project
# ------------------------------------------------------------
@router.get("/{project_id}", response_model=ProjectResponse)
def get_user_project(
    project_id: int, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    project = db.query(models.Project).options(
        joinedload(models.Project.files),
        joinedload(models.Project.skills),
        joinedload(models.Project.external_links),
        joinedload(models.Project.team_members),
    ).filter(
        models.Project.id == project_id
    ).first()
    
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    # Permission check point
    portfolio = db.query(models.Portfolio).filter(
        models.Portfolio.id == project.portfolio_id
    ).first()

    # If user owns the project → return private version
    if current_user.id == portfolio.user_id:
        return project

    # If user does NOT own it → only return if published
    if project.is_published:
        return project
    
    # if not the current user nor published project.
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="You are not allowed to view this project"
    )



# ------------------------------------------------------------
# Update Project
# ------------------------------------------------------------
@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(
    project_id: int, 
    payload: ProjectUpdate, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    project = db.query(models.Project).filter(
        models.Project.id == project_id
    ).first()

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )

    # Permission check point
    portfolio = db.query(models.Portfolio).filter(
        models.Portfolio.id == project.portfolio_id
    ).first()

    if current_user.id != portfolio.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to update this project"
        )
    
    # Update fields
    if payload.title is not None:
        project.title = payload.title

    if payload.short_description is not None:
        project.short_description = payload.short_description

    if payload.full_description is not None:
        project.full_description = payload.full_description

    if payload.tags is not None:
        project.tags = payload.tags

    if payload.is_published is not None:
        project.is_published = payload.is_published

    if payload.project_date is not None:
        project.project_date = payload.project_date

    db.commit()
    db.refresh(project)

    return project


# ------------------------------------------------------------
# Delete Project
# ------------------------------------------------------------
@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(
    project_id: int, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    project = db.query(models.Project).filter(
        models.Project.id == project_id
    ).first()

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )

    # Permission check point
    portfolio = db.query(models.Portfolio).filter(
        models.Portfolio.id == project.portfolio_id
    ).first()
    
    if current_user.id != portfolio.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to delete this project"
        )
    
    # delete all files related to the project
    project_files = db.query(models.File).filter(
        models.File.project_id == project.id
    ).all()
    
    if project_files:
        for file in project_files:
            if os.path.exists(file.storage_path):
                os.remove(file.storage_path)
    
    db.delete(project)
    db.commit()

    return None

