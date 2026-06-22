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
from app.schemas.language import (
    LanguageCreate,
    LanguageUpdate,
    LanguageResponse
)
from app.utils.security import get_current_user

router = APIRouter(
    prefix="/languages",
    tags=["Languages"]
)

# ------------------------------------------------------------
# Create Language
# ------------------------------------------------------------
@router.post("/", response_model=LanguageResponse)
def create_language(
    payload: LanguageCreate, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):

    # Ensure portfolio exists
    portfolio = db.query(models.Portfolio).filter(
        models.Portfolio.id == payload.portfolio_id
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
            detail="You are not allowed to create this language"
        )

    # Enforce unique language per portfolio
    existing = db.query(models.Language).filter(
        models.Language.portfolio_id == payload.portfolio_id,
        models.Language.language_name == payload.language_name
    ).first()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Language already exists for this portfolio"
        )

    # Validate proficiency range (1–3)
    if not (1 <= payload.proficiency_level <= 3):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="proficiency_level must be between 1 and 3"
        )

    new_language = models.Language(
        portfolio_id=payload.portfolio_id,
        language_name=payload.language_name,
        proficiency_level=payload.proficiency_level
    )

    db.add(new_language)
    db.commit()
    db.refresh(new_language)

    return new_language


# ------------------------------------------------------------
# Get All Languages for a Portfolio
# ------------------------------------------------------------
@router.get("/portfolio/{portfolio_id}", response_model=list[LanguageResponse])
def get_portfolio_languages(
    portfolio_id: int, 
    db: Session = Depends(get_db)
):
    languages = db.query(models.Language).filter(
        models.Language.portfolio_id == portfolio_id
    ).all()

    return languages


# ------------------------------------------------------------
# Get Single Language
# ------------------------------------------------------------
@router.get("/{language_id}", response_model=LanguageResponse)
def get_language(
    language_id: int, 
    db: Session = Depends(get_db)
):
    language = db.query(models.Language).filter(
        models.Language.id == language_id
    ).first()

    if not language:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Language not found"
        )

    return language


# ------------------------------------------------------------
# Update Language
# ------------------------------------------------------------
@router.put("/{language_id}", response_model=LanguageResponse)
def update_language(
    language_id: int, 
    payload: LanguageUpdate, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    language = db.query(models.Language).filter(
        models.Language.id == language_id
    ).first()

    # Permission check point    
    portfolio = db.query(models.Portfolio).filter(
        models.Portfolio.id == language.portfolio_id
    ).first()

    if current_user.id != portfolio.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to create this language"
        )

    if not language:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Language not found"
        )

    # Update language_name (with unique check)
    if payload.language_name is not None:
        existing = db.query(models.Language).filter(
            models.Language.portfolio_id == language.portfolio_id,
            models.Language.language_name == payload.language_name,
            models.Language.id != language.id
        ).first()

        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Another language with this name already exists in this portfolio"
            )

        language.language_name = payload.language_name

    # Update proficiency
    if payload.proficiency_level is not None:
        if not (1 <= payload.proficiency_level <= 3):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="proficiency_level must be between 1 and 3"
            )
        language.proficiency_level = payload.proficiency_level

    db.commit()
    db.refresh(language)

    return language


# ------------------------------------------------------------
# Delete Language
# ------------------------------------------------------------
@router.delete("/{language_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_language(
    language_id: int, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    language = db.query(models.Language).filter(
        models.Language.id == language_id
    ).first()

    # Permission check point    
    portfolio = db.query(models.Portfolio).filter(
        models.Portfolio.id == language.portfolio_id
    ).first()

    if current_user.id != portfolio.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to create this language"
        )

    if not language:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Language not found"
        )

    db.delete(language)
    db.commit()

    return None
