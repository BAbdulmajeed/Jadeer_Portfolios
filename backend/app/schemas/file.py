from pydantic import BaseModel
from typing import (
    Optional, 
    Literal
)

# ------------------------------------------------------------
# Base shared fields
# ------------------------------------------------------------
class FileBase(BaseModel):
    file_purpose: Literal["profile_image", "portfolio_cover", "project_cover","project_images", "certificates", "resume", "other"]
    file_name: str
    mime_type: str
    storage_path: str
    size_bytes: int


# ------------------------------------------------------------
# Create File (backend fills metadata)
# ------------------------------------------------------------
class FileCreate(BaseModel):
    portfolio_id: int
    project_id: Optional[int] = None
    file_purpose: Literal["profile_image", "portfolio_cover", "project_cover","project_images", "certificates", "resume", "other"]


# ------------------------------------------------------------
# Update File (always replace file)
# ------------------------------------------------------------
class FileUpdate(BaseModel):
    file_purpose: Optional[Literal["profile_image", "portfolio_cover", "project_cover","project_images", "certificates", "resume", "other"]] = None


# ------------------------------------------------------------
# File Response
# ------------------------------------------------------------
class FileResponse(FileBase):
    id: int
    portfolio_id: int
    project_id: Optional[int] = None

    class Config:
        from_attributes = True
