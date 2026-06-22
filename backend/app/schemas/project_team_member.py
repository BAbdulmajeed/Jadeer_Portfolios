# Import the required libraries
from pydantic import (
    BaseModel, 
    HttpUrl
)
from typing import Optional


# ------------------------------------------------------------
# Base shared fields
# ------------------------------------------------------------
class ProjectTeamMemberBase(BaseModel):
    name: str
    role: Optional[str] = None
    url: Optional[HttpUrl] = None


# ------------------------------------------------------------
# Create Team Member
# ------------------------------------------------------------
class ProjectTeamMemberCreate(ProjectTeamMemberBase):
    project_id: int  # required in DB


# ------------------------------------------------------------
# Update Team Member (all optional)
# ------------------------------------------------------------
class ProjectTeamMemberUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    url: Optional[HttpUrl] = None


# ------------------------------------------------------------
# Team Member Response
# ------------------------------------------------------------
class ProjectTeamMemberResponse(ProjectTeamMemberBase):
    id: int
    project_id: int

    class Config:
        from_attributes = True


