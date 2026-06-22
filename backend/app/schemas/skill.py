# Import the required libraries
from pydantic import BaseModel
from typing import Optional


# ------------------------------------------------------------
# Base shared fields
# ------------------------------------------------------------
class SkillBase(BaseModel):
    skill_name: str
    level_of_proficiency: int = 1  # 1 to 5


# ------------------------------------------------------------
# Create Skill
# ------------------------------------------------------------
class SkillCreate(SkillBase):
    portfolio_id: int
    project_id: Optional[int] = None  # optional because skills can belong to portfolio only


# ------------------------------------------------------------
# Update Skill (all optional)
# ------------------------------------------------------------
class SkillUpdate(BaseModel):
    skill_name: Optional[str] = None
    level_of_proficiency: Optional[int] = None
    project_id: Optional[int] = None


# ------------------------------------------------------------
# Skill Response
# ------------------------------------------------------------
class SkillResponse(SkillBase):
    id: int
    portfolio_id: int
    project_id: Optional[int] = None

    class Config:
        from_attributes = True
