# Import the required libraries
from fastapi import (
    APIRouter, 
    Depends, 
    HTTPException, 
    status
)
from sqlalchemy.orm import Session
import os
# Import the required files
from app.utils.database import get_db
from app import models
from app.schemas.user import (
    UserCreate,
    UserUpdate,
    UserResponse
)
from app.utils.security import (
    hash_password,
    get_current_user
)

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

# ------------------------------------------------------------
# Get All Users
# ------------------------------------------------------------
@router.get("/", response_model=list[UserResponse])
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users


# ------------------------------------------------------------
# Get User by ID
# ------------------------------------------------------------
@router.get("/{user_id}", response_model=UserResponse)
def get_user(
    user_id: int, 
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(
        models.User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return user


# ------------------------------------------------------------
# Update User
# ------------------------------------------------------------
@router.put("/{user_id}", response_model=UserResponse)
def update_user(
    user_id: int, 
    payload: UserUpdate, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    user = db.query(models.User).filter(
        models.User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Permission check point
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to update this user"
        )

    # Update email (with unique check)
    if payload.email is not None:
        existing_email = db.query(models.User).filter(
            models.User.email == payload.email,
            models.User.id != user.id
        ).first()

        if existing_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        user.email = payload.email

    # Update name
    if payload.name is not None:
        user.name = payload.name

    # Update phone number
    if payload.phone_number is not None:
        user.phone_number = payload.phone_number

    # Update birth_day
    if payload.birth_day is not None:
        user.birth_day = payload.birth_day

    # Update location
    if payload.location is not None:
        user.location = payload.location

    # Update password
    if payload.password is not None:
        user.password_hash = hash_password(payload.password)

    db.commit()
    db.refresh(user)

    return user


# ------------------------------------------------------------
# Delete User
# ------------------------------------------------------------
@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(
    user_id: int, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    user = db.query(models.User).filter(
        models.User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Permission check point
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to delete this user"
        )
    # delete all files related to the user
    portfolio = db.query(models.Portfolio).filter(
        models.Portfolio.user_id == user_id
    ).first()

    if portfolio:
        portfolio_files = db.query(models.File).filter(
            models.File.portfolio_id == portfolio.id
        ).all()
        
        if portfolio_files:
            for file in portfolio_files:
                if os.path.exists(file.storage_path):
                    os.remove(file.storage_path)

    db.delete(user)
    db.commit()

    return None
