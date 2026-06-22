# Import the required libraries
from fastapi import (
    APIRouter, 
    Depends, 
    HTTPException, 
    status
)
from sqlalchemy.orm import Session

# Import the required files
from app.utils.database import get_db
from app import models
from app.schemas.external_link import (
    ExternalLinkCreate,
    ExternalLinkUpdate,
    ExternalLinkResponse
)
from app.utils.security import get_current_user

router = APIRouter(
    prefix="/external-links",
    tags=["External Links"]
)

# ------------------------------------------------------------
# Create External Link
# ------------------------------------------------------------
@router.post("/", response_model=ExternalLinkResponse)
def create_external_link(
    payload: ExternalLinkCreate, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):

    # Check unique constraint manually (portfolio_id + project_id + label)
    existing = db.query(models.ExternalLink).filter(
        models.ExternalLink.portfolio_id == payload.portfolio_id,
        models.ExternalLink.project_id == payload.project_id,
        models.ExternalLink.label == payload.label
    ).first()

    # Permission check point
    portfolio = db.query(models.Portfolio).filter(
        models.Portfolio.id == payload.portfolio_id
    ).first()
    
    if current_user.id != portfolio.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to delete this project"
        )

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This label already exists for this portfolio/project"
        )

    new_link = models.ExternalLink(
        portfolio_id=payload.portfolio_id,
        project_id=payload.project_id,
        label=payload.label,
        url=str(payload.url)
    )

    db.add(new_link)
    db.commit()
    db.refresh(new_link)

    return new_link


# ------------------------------------------------------------
# Get All External Links for a Portfolio
# ------------------------------------------------------------
@router.get("/portfolio/{portfolio_id}", response_model=list[ExternalLinkResponse])
def get_portfolio_links(
    portfolio_id: int, 
    db: Session = Depends(get_db)
):
    links = db.query(models.ExternalLink).filter(
        models.ExternalLink.portfolio_id == portfolio_id,
        models.ExternalLink.project_id == 0
    ).all()

    return links


# ------------------------------------------------------------
# Get All External Links for a Project
# ------------------------------------------------------------
@router.get("/project/{project_id}", response_model=list[ExternalLinkResponse])
def get_project_links(
    project_id: int, 
    db: Session = Depends(get_db)
):
    links = db.query(models.ExternalLink).filter(
        models.ExternalLink.project_id == project_id
    ).all()

    return links


# ------------------------------------------------------------
# Get Single External Link
# ------------------------------------------------------------
@router.get("/{link_id}", response_model=ExternalLinkResponse)
def get_external_link(
    link_id: int, 
    db: Session = Depends(get_db)
):
    link = db.query(models.ExternalLink).filter(
        models.ExternalLink.id == link_id
    ).first()

    if not link:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="External link not found"
        )

    return link


# ------------------------------------------------------------
# Update External Link
# ------------------------------------------------------------
@router.put("/{link_id}", response_model=ExternalLinkResponse)
def update_external_link(
    link_id: int, 
    payload: ExternalLinkUpdate, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    link = db.query(models.ExternalLink).filter(
        models.ExternalLink.id == link_id
    ).first()

    # Permission check point
    portfolio = db.query(models.Portfolio).filter(
        models.Portfolio.id == link.portfolio_id
    ).first()
    
    if current_user.id != portfolio.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to delete this project"
        )

    if not link:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="External link not found"
        )

    # Update fields
    if payload.label is not None:
        link.label = payload.label

    if payload.url is not None:
        link.url = str(payload.url)

    if payload.project_id is not None:
        link.project_id = payload.project_id

    db.commit()
    db.refresh(link)

    return link


# ------------------------------------------------------------
# Delete External Link
# ------------------------------------------------------------
@router.delete("/{link_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_external_link(
    link_id: int, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    link = db.query(models.ExternalLink).filter(
        models.ExternalLink.id == link_id
    ).first()

    # Permission check point
    portfolio = db.query(models.Portfolio).filter(
        models.Portfolio.id == link.portfolio_id
    ).first()
    
    if current_user.id != portfolio.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to delete this project"
        )

    if not link:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="External link not found"
        )

    db.delete(link)
    db.commit()

    return None
