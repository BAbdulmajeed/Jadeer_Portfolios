# Import the required libraries
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# Import the required schemas
from .user import UserResponse
from .skill import SkillResponse
from .language import LanguageResponse
from .file import FileResponse
from .external_link import ExternalLinkResponse
from .project import ProjectResponse


# ------------------------------------------------------------
# Base shared fields
# ------------------------------------------------------------
class PortfolioBase(BaseModel):
    role_title: Optional[str] = None
    description: Optional[str] = None
    university: Optional[str] = None
    major: Optional[str] = None
    about_me: Optional[str] = None
    is_published: bool = False


# ------------------------------------------------------------
# Create Portfolio
# ------------------------------------------------------------
class PortfolioCreate(PortfolioBase):
     user_id: int


# ------------------------------------------------------------
# Update Portfolio (all optional)
# ------------------------------------------------------------
class PortfolioUpdate(BaseModel):
    role_title: Optional[str] = None
    description: Optional[str] = None
    university: Optional[str] = None
    major: Optional[str] = None
    about_me: Optional[str] = None
    is_published: Optional[bool] = None


# ------------------------------------------------------------
# Portfolio Response (nested)
# ------------------------------------------------------------
class PortfolioResponse(PortfolioBase):
    id: int
    user: UserResponse

    # Nested children (forward references)
    projects: List["ProjectResponse"] = []
    skills: List["SkillResponse"] = []
    languages: List["LanguageResponse"] = []
    files: List["FileResponse"] = []
    external_links: List["ExternalLinkResponse"] = []

    class Config:
        from_attributes = True
