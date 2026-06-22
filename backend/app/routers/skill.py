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
from app.schemas.skill import (
    SkillCreate,
    SkillUpdate,
    SkillResponse
)
from app.utils.security import get_current_user

router = APIRouter(
    prefix="/skills",
    tags=["Skills"]
)

# ------------------------------------------------------------
# Create Skill
# ------------------------------------------------------------
@router.post("/", response_model=SkillResponse)
def create_skill(
    payload: SkillCreate, 
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
            detail="You are not allowed to create this skill"
        )
    
    # Enforce unique skill per portfolio
    existing = db.query(models.Skill).filter(
        models.Skill.portfolio_id == payload.portfolio_id,
        models.Skill.project_id == payload.project_id,
        models.Skill.skill_name == payload.skill_name
    ).first()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Skill already exists for this portfolio"
        )

    # Validate proficiency range
    if not (1 <= payload.level_of_proficiency <= 5):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="level_of_proficiency must be between 1 and 5"
        )

    new_skill = models.Skill(
        portfolio_id=payload.portfolio_id,
        project_id=payload.project_id,
        skill_name=payload.skill_name,
        level_of_proficiency=payload.level_of_proficiency
    )

    db.add(new_skill)
    db.commit()
    db.refresh(new_skill)

    return new_skill


# ------------------------------------------------------------
# Get All Skills for a Portfolio
# ------------------------------------------------------------
@router.get("/portfolio/{portfolio_id}", response_model=list[SkillResponse])
def get_portfolio_skills(
    portfolio_id: int, 
    db: Session = Depends(get_db)
):
    skills = db.query(models.Skill).filter(
        models.Skill.portfolio_id == portfolio_id,
        models.Skill.project_id == 0
    ).all()

    return skills


# ------------------------------------------------------------
# Get All Skills for a Project
# ------------------------------------------------------------
@router.get("/project/{project_id}", response_model=list[SkillResponse])
def get_project_skills(
    project_id: int, 
    db: Session = Depends(get_db)
):
    skills = db.query(models.Skill).filter(
        models.Skill.project_id == project_id
    ).all()

    return skills


# ------------------------------------------------------------
# Get Single Skill
# ------------------------------------------------------------
@router.get("/{skill_id}", response_model=SkillResponse)
def get_skill(
    skill_id: int, 
    db: Session = Depends(get_db)
):
    skill = db.query(models.Skill).filter(
        models.Skill.id == skill_id
    ).first()

    if not skill:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill not found"
        )

    return skill


# ------------------------------------------------------------
# Update Skill
# ------------------------------------------------------------
@router.put("/{skill_id}", response_model=SkillResponse)
def update_skill(
    skill_id: int, 
    payload: SkillUpdate, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    skill = db.query(models.Skill).filter(
        models.Skill.id == skill_id
    ).first()
    
    # Permission check point    
    portfolio = db.query(models.Portfolio).filter(
        models.Portfolio.id == skill.portfolio_id
    ).first()

    if current_user.id != portfolio.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to update this skill"
        )

    if not skill:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill not found"
        )

    # Update skill_name (with unique check)
    if payload.skill_name is not None:
        existing = db.query(models.Skill).filter(
            models.Skill.portfolio_id == skill.portfolio_id,
            models.Skill.skill_name == payload.skill_name,
            models.Skill.id != skill.id
        ).first()

        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Another skill with this name already exists in this portfolio"
            )

        skill.skill_name = payload.skill_name

    # Update proficiency
    if payload.level_of_proficiency is not None:
        if not (1 <= payload.level_of_proficiency <= 5):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="level_of_proficiency must be between 1 and 5"
            )
        skill.level_of_proficiency = payload.level_of_proficiency

    # Update project assignment
    if payload.project_id is not None:
        skill.project_id = payload.project_id

    db.commit()
    db.refresh(skill)

    return skill


# ------------------------------------------------------------
# Delete Skill
# ------------------------------------------------------------
@router.delete("/{skill_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_skill(
    skill_id: int, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    skill = db.query(models.Skill).filter(
        models.Skill.id == skill_id
    ).first()

    # Permission check point    
    portfolio = db.query(models.Portfolio).filter(
        models.Portfolio.id == skill.portfolio_id
    ).first()

    if current_user.id != portfolio.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to delete this skill"
        )


    if not skill:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill not found"
        )

    db.delete(skill)
    db.commit()

    return None
