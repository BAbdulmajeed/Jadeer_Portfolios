# Import the required libraries
from fastapi import (
    APIRouter, 
    Depends, 
    HTTPException, 
    status
)
from sqlalchemy.orm import (
    Session, 
    joinedload, 
    with_loader_criteria
)

# Import the required files
from app.utils.database import get_db
from app import models
from app.schemas.portfolio import (
    PortfolioUpdate,
    PortfolioResponse,
)
from app.utils.security import get_current_user

router = APIRouter(
    prefix="/portfolios",
    tags=["Portfolios"]
)

# ------------------------------------------------------------
# Get Current User Portfolio
# ------------------------------------------------------------
@router.get("/me", response_model=PortfolioResponse)
def get_user_portfolio(
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    portfolio = db.query(models.Portfolio).options(
        joinedload(models.Portfolio.user),
        joinedload(models.Portfolio.projects),
        joinedload(models.Portfolio.skills),
        joinedload(models.Portfolio.languages),
        joinedload(models.Portfolio.files),
        joinedload(models.Portfolio.external_links),
    ).filter(
        models.Portfolio.user_id == current_user.id
    ).first()

    if not portfolio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Portfolio not found"
        )
    
    return portfolio


# ------------------------------------------------------------
# Public Portfolio
# ------------------------------------------------------------
@router.get("/{portfolio_id}", response_model=PortfolioResponse)
def get_public_portfolio(
    portfolio_id: int, 
    db: Session = Depends(get_db)
):
    portfolio = db.query(models.Portfolio).options(
        joinedload(models.Portfolio.user),
        joinedload(models.Portfolio.projects),
        joinedload(models.Portfolio.skills),
        joinedload(models.Portfolio.languages),
        joinedload(models.Portfolio.files),
        joinedload(models.Portfolio.external_links),

        with_loader_criteria(models.Project, models.Project.is_published == True)
    ).filter(
        models.Portfolio.id == portfolio_id,
        models.Portfolio.is_published == True
    ).first()

    if not portfolio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Public portfolio not found"
        )

    return portfolio


# ------------------------------------------------------------
# Update Current User Portfolio
# ------------------------------------------------------------
@router.put("/me", response_model=PortfolioResponse)
def update_portfolio(
    payload: PortfolioUpdate, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    portfolio = db.query(models.Portfolio).filter(
        models.Portfolio.id == current_user.id
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
            detail="You are not allowed to update this portfolio"
        )
    
    # Update fields
    if payload.role_title is not None:
        portfolio.role_title = payload.role_title

    if payload.description is not None:
        portfolio.description = payload.description

    if payload.university is not None:
        portfolio.university = payload.university

    if payload.major is not None:
        portfolio.major = payload.major

    if payload.about_me is not None:
        portfolio.about_me = payload.about_me

    if payload.is_published is not None:
        portfolio.is_published = payload.is_published

    db.commit()
    db.refresh(portfolio)

    return portfolio

