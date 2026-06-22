from sqlalchemy import (
    Column, 
    Integer, 
    String, 
    Text, 
    Date, 
    Boolean, 
    ForeignKey
)
from sqlalchemy.orm import relationship

from app.utils.database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    portfolio_id = Column(Integer, ForeignKey("portfolios.id", ondelete="CASCADE"), nullable=False)
    title = Column(String, nullable=False)
    short_description = Column(Text, nullable=True)
    full_description = Column(Text, nullable=True)
    tags = Column(String, nullable=True)
    is_published = Column(Boolean, nullable=False, server_default="0")
    project_date = Column(Date, nullable=True)

    portfolio = relationship("Portfolio", back_populates="projects")
    files = relationship("File", back_populates="project", cascade="all, delete")
    skills = relationship("Skill", back_populates="project", cascade="all, delete")
    external_links = relationship("ExternalLink", back_populates="project", cascade="all, delete")
    team_members = relationship("ProjectTeamMember", back_populates="project", cascade="all, delete")
