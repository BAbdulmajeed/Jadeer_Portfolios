# Import the required libraries
from pydantic import (
    BaseModel, 
    HttpUrl
)
from typing import Optional


# ------------------------------------------------------------
# Base shared fields
# ------------------------------------------------------------
class ExternalLinkBase(BaseModel):
    label: str
    url: HttpUrl


# ------------------------------------------------------------
# Create External Link
# ------------------------------------------------------------
class ExternalLinkCreate(ExternalLinkBase):
    portfolio_id: int
    project_id: Optional[int] = None


# ------------------------------------------------------------
# Update External Link (all optional)
# ------------------------------------------------------------
class ExternalLinkUpdate(BaseModel):
    label: Optional[str] = None
    url: Optional[HttpUrl] = None
    project_id: Optional[int] = None


# ------------------------------------------------------------
# External Link Response
# ------------------------------------------------------------
class ExternalLinkResponse(ExternalLinkBase):
    id: int
    portfolio_id: int
    project_id: Optional[int] = None

    class Config:
        from_attributes = True

