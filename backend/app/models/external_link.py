from sqlalchemy import (
    Column,
    Integer, 
    String, 
    ForeignKey, 
    UniqueConstraint
)
from sqlalchemy.orm import relationship

from app.utils.database import Base

class ExternalLink(Base):
    __tablename__ = "external_links"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    portfolio_id = Column(Integer, ForeignKey("portfolios.id", ondelete="CASCADE"), nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=True)
    label = Column(String, nullable=False)
    url = Column(String, nullable=False)

    __table_args__ = (
        UniqueConstraint("portfolio_id", "project_id", "label"),
    )

    portfolio = relationship("Portfolio", back_populates="external_links")
    project = relationship("Project", back_populates="external_links")
