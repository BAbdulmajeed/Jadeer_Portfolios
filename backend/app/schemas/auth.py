# Import the required libraries
from pydantic import (
    BaseModel, 
    EmailStr
)
from typing import Optional

# ------------------------------------------------------------
# Login Request
# ------------------------------------------------------------
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# ------------------------------------------------------------
# Register Request
# ------------------------------------------------------------
class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


# ------------------------------------------------------------
# Token Response
# ------------------------------------------------------------
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    refresh_token: Optional[str] = None
