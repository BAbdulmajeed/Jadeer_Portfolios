from sqlalchemy import (
    Column, 
    Integer, 
    String, Text,
    Boolean, 
    ForeignKey
)
from sqlalchemy.orm import relationship

from app.utils.database import Base

class Portfolio(Base):
    __tablename__ = "portfolios"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True)
    role_title = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    university = Column(String, nullable=True)
    major = Column(String, nullable=True)
    about_me = Column(Text, nullable=True)
    is_published = Column(Boolean, nullable=False, server_default="0")

    user = relationship("User", back_populates="portfolio")
    projects = relationship("Project", back_populates="portfolio", cascade="all, delete")
    languages = relationship("Language", back_populates="portfolio", cascade="all, delete")
    skills = relationship("Skill", back_populates="portfolio", cascade="all, delete")
    files = relationship("File", back_populates="portfolio", cascade="all, delete")
    external_links = relationship("ExternalLink", back_populates="portfolio", cascade="all, delete")
