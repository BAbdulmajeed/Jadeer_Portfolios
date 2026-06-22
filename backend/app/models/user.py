from sqlalchemy import (
    Column, 
    Integer, 
    String, 
    Date, 
    DateTime
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.utils.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    email = Column(String, nullable=False, unique=True, index=True)
    password_hash = Column(String, nullable=False)
    name = Column(String, nullable=False)
    phone_number = Column(String, nullable=True)
    birth_day = Column(Date, nullable=True)
    location = Column(String, nullable=True)
    created_at = Column(DateTime, server_default=func.current_timestamp())
    updated_at = Column(DateTime, server_default=func.current_timestamp())

    portfolio = relationship("Portfolio", back_populates="user", uselist=False, cascade="all, delete")
