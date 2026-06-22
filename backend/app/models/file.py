from sqlalchemy import (
    Column, 
    Integer, 
    String, 
    ForeignKey, 
    CheckConstraint
)
from sqlalchemy.orm import relationship

from app.utils.database import Base

class File(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    portfolio_id = Column(Integer, ForeignKey("portfolios.id", ondelete="CASCADE"), nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=True)
    file_purpose = Column(String, nullable=False)
    file_name = Column(String, nullable=False)
    mime_type = Column(String, nullable=False)
    storage_path = Column(String, nullable=False)
    size_bytes = Column(Integer, nullable=False)

    __table_args__ = (
        CheckConstraint("file_purpose IN ('profile_image', 'portfolio_cover', 'project_cover','project_images', 'certificates', 'resume', 'other')"),
    )

    portfolio = relationship("Portfolio", back_populates="files")
    project = relationship("Project", back_populates="files")

