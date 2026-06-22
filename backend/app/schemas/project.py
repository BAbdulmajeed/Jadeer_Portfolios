# Import the required libraries
from pydantic import BaseModel
from typing import Optional, List
from datetime import date

# Import the required schemas
from .file import FileResponse
from .skill import SkillResponse
from .external_link import ExternalLinkResponse
from .project_team_member import ProjectTeamMemberResponse


# ------------------------------------------------------------
# Base shared fields
# ------------------------------------------------------------
class ProjectBase(BaseModel):
    title: str
    short_description: Optional[str] = None
    full_description: Optional[str] = None
    tags: Optional[str] = None
    is_published: bool = False
    project_date: Optional[date] = None


# ------------------------------------------------------------
# Create Project
# ------------------------------------------------------------
class ProjectCreate(ProjectBase):
    pass  # nothing extra needed


# ------------------------------------------------------------
# Update Project (all optional)
# ------------------------------------------------------------
class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    short_description: Optional[str] = None
    full_description: Optional[str] = None
    tags: Optional[str] = None
    is_published: Optional[bool] = None
    project_date: Optional[date] = None


# ------------------------------------------------------------
# Project Response (nested)
# ------------------------------------------------------------
class ProjectResponse(ProjectBase):
    id: int
    portfolio_id: int

    # Nested children (forward references)
    files: List["FileResponse"] = []
    skills: List["SkillResponse"] = []
    external_links: List["ExternalLinkResponse"] = []
    team_members: List["ProjectTeamMemberResponse"] = []

    class Config:
        from_attributes = True
