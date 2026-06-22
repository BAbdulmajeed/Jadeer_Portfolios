# Import the required libraries
from pydantic import (
    BaseModel, 
    EmailStr
)
from typing import Optional
from datetime import date, datetime


# ------------------------------------------------------------
# Base shared fields
# ------------------------------------------------------------
class UserBase(BaseModel):
    email: EmailStr
    name: str
    phone_number: Optional[str] = None
    birth_day: Optional[date] = None
    location: Optional[str] = None


# ------------------------------------------------------------
# Schema for creating a user (signup)
# UserCreate inheritance UserBase
# ------------------------------------------------------------
class UserCreate(UserBase):
    password: str  # plain password from client


# ------------------------------------------------------------
# Schema for updating a user
# All fields optional
# ------------------------------------------------------------
class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    name: Optional[str] = None
    phone_number: Optional[str] = None
    birth_day: Optional[date] = None
    location: Optional[str] = None
    password: Optional[str] = None


# ------------------------------------------------------------
# Schema returned to the client
# Includes timestamps and ID
# Portfolio will be added later (nested)
# ------------------------------------------------------------
class UserResponse(UserBase):
    id: int
    location: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True  # allows ORM → Pydantic conversion

