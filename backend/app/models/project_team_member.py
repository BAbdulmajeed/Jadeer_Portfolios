from sqlalchemy import (
    Column, 
    Integer, 
    String, 
    ForeignKey, 
    UniqueConstraint
)
from sqlalchemy.orm import relationship

from app.utils.database import Base

class ProjectTeamMember(Base):
    __tablename__ = "project_team_members"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    name = Column(String, nullable=False)
    role = Column(String, nullable=True)
    url = Column(String, nullable=True)

    __table_args__ = (
        UniqueConstraint("project_id", "name"),
    )

    project = relationship("Project", back_populates="team_members")
