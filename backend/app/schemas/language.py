# Import the required libraries
from pydantic import BaseModel
from typing import Optional


# ------------------------------------------------------------
# Base shared fields
# ------------------------------------------------------------
class LanguageBase(BaseModel):
    language_name: str
    proficiency_level: int  # 1 to 5


# ------------------------------------------------------------
# Create Language
# ------------------------------------------------------------
class LanguageCreate(LanguageBase):
    portfolio_id: int  # required because every language belongs to a portfolio


# ------------------------------------------------------------
# Update Language (all optional)
# ------------------------------------------------------------
class LanguageUpdate(BaseModel):
    language_name: Optional[str] = None
    proficiency_level: Optional[int] = None


# ------------------------------------------------------------
# Language Response
# ------------------------------------------------------------
class LanguageResponse(LanguageBase):
    id: int
    portfolio_id: int

    class Config:
        from_attributes = True
