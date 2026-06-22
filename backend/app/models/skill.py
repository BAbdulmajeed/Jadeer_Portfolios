from sqlalchemy import (
    Column, 
    Integer, 
    String, 
    ForeignKey, 
    UniqueConstraint, 
    CheckConstraint
)
from sqlalchemy.orm import relationship

from app.utils.database import Base

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    portfolio_id = Column(Integer, ForeignKey("portfolios.id", ondelete="CASCADE"), nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=True)
    skill_name = Column(String, nullable=False)
    level_of_proficiency = Column(Integer, nullable=False, default=1)

    __table_args__ = (
        UniqueConstraint("portfolio_id", "project_id", "skill_name"),
        CheckConstraint("level_of_proficiency BETWEEN 1 AND 5")
    )

# cascade?
    portfolio = relationship("Portfolio", back_populates="skills")
    project = relationship("Project", back_populates="skills")
