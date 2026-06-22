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

class Language(Base):
    __tablename__ = "languages"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    portfolio_id = Column(Integer, ForeignKey("portfolios.id", ondelete="CASCADE"), nullable=False)
    language_name = Column(String, nullable=False)
    proficiency_level = Column(Integer, nullable=False, default=1)

    __table_args__ = (
        UniqueConstraint("portfolio_id", "language_name"),
        CheckConstraint("proficiency_level BETWEEN 1 AND 3"),
    )

    portfolio = relationship("Portfolio", back_populates="languages")
