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
from app.schemas.project_team_member import (
    ProjectTeamMemberCreate,
    ProjectTeamMemberUpdate,
    ProjectTeamMemberResponse
)
from app.utils.security import get_current_user

router = APIRouter(
    prefix="/team-members",
    tags=["Project Team Members"]
)

# ------------------------------------------------------------
# Create Team Member
# ------------------------------------------------------------
@router.post("/", response_model=ProjectTeamMemberResponse)
def create_team_member(
    payload: ProjectTeamMemberCreate, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):

    # Ensure project exists
    project = db.query(models.Project).filter(
        models.Project.id == payload.project_id
    ).first()

    # Permission check point
    portfolio = db.query(models.Portfolio).filter(
        models.Portfolio.id == project.portfolio_id
    ).first()
    
    if current_user.id != portfolio.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to delete this project"
        )

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )

    # Enforce unique constraint: project_id + name
    existing = db.query(models.ProjectTeamMember).filter(
        models.ProjectTeamMember.project_id == payload.project_id,
        models.ProjectTeamMember.name == payload.name
    ).first()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A team member with this name already exists in this project"
        )

    new_member = models.ProjectTeamMember(
        project_id=payload.project_id,
        name=payload.name,
        role=payload.role,
        url=str(payload.url)
    )

    db.add(new_member)
    db.commit()
    db.refresh(new_member)

    return new_member


# ------------------------------------------------------------
# Get All Team Members for a Project
# ------------------------------------------------------------
@router.get("/project/{project_id}", response_model=list[ProjectTeamMemberResponse])
def get_project_team_members(
    project_id: int, 
    db: Session = Depends(get_db)
):
    members = db.query(models.ProjectTeamMember).filter(
        models.ProjectTeamMember.project_id == project_id
    ).all()

    return members


# ------------------------------------------------------------
# Get Single Team Member
# ------------------------------------------------------------
@router.get("/{member_id}", response_model=ProjectTeamMemberResponse)
def get_team_member(
    member_id: int, 
    db: Session = Depends(get_db)
):
    member = db.query(models.ProjectTeamMember).filter(
        models.ProjectTeamMember.id == member_id
    ).first()

    if not member:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team member not found"
        )

    return member


# ------------------------------------------------------------
# Update Team Member
# ------------------------------------------------------------
@router.put("/{member_id}", response_model=ProjectTeamMemberResponse)
def update_team_member(
    member_id: int, 
    payload: ProjectTeamMemberUpdate, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    member = db.query(models.ProjectTeamMember).filter(
        models.ProjectTeamMember.id == member_id
    ).first()

    # Permission check point
    project = db.query(models.Project).filter(
        models.Project.id == member.project_id
    ).first()

    portfolio = db.query(models.Portfolio).filter(
        models.Portfolio.id == project.portfolio_id
    ).first()
    
    if current_user.id != portfolio.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to delete this project"
        )

    if not member:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team member not found"
        )

    # Update name (with unique check)
    if payload.name is not None:
        existing = db.query(models.ProjectTeamMember).filter(
            models.ProjectTeamMember.project_id == member.project_id,
            models.ProjectTeamMember.name == payload.name,
            models.ProjectTeamMember.id != member.id
        ).first()

        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Another team member with this name already exists in this project"
            )

        member.name = payload.name

    # Update role
    if payload.role is not None:
        member.role = payload.role

    # Update URL
    if payload.url is not None:
        member.url = str(payload.url)

    db.commit()
    db.refresh(member)

    return member


# ------------------------------------------------------------
# Delete Team Member
# ------------------------------------------------------------
@router.delete("/{member_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_team_member(
    member_id: int, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    member = db.query(models.ProjectTeamMember).filter(
        models.ProjectTeamMember.id == member_id
    ).first()

    # Permission check point
    project = db.query(models.Project).filter(
        models.Project.id == member.project_id
    ).first()

    portfolio = db.query(models.Portfolio).filter(
        models.Portfolio.id == project.portfolio_id
    ).first()
    
    if current_user.id != portfolio.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to delete this project"
        )


    if not member:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team member not found"
        )

    db.delete(member)
    db.commit()

    return None
