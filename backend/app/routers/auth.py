# Import the required libraries
from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
    Header
)
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

# Import the required files
from app.utils.database import get_db
from app.utils.security import (
    verify_password,
    hash_password,
    create_access_token,
    create_refresh_token,
    decode_refresh_token
)
from app import models
from app.schemas.auth import (
    RegisterRequest,
    TokenResponse
)

# Define the router
router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

# ------------------------------------------------------------
# Register Endpoint
# ------------------------------------------------------------
@router.post("/register", response_model=TokenResponse)
def register(
    payload: RegisterRequest, 
    db: Session = Depends(get_db)
):

    # Check if email already exists
    existing_email = db.query(models.User).filter(
        models.User.email == payload.email
        ).first()
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )


    # Create new user and portfolio
    new_user = models.User(
        name=payload.name,
        email=payload.email,
        password_hash=hash_password(payload.password),
        portfolio=models.Portfolio()  # auto-create portfolio
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Generate tokens
    access_token = create_access_token({"user_id": new_user.id})
    refresh_token = create_refresh_token({"user_id": new_user.id})

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token
    )

# ------------------------------------------------------------
# Login Endpoint
# ------------------------------------------------------------
@router.post("/login", response_model=TokenResponse)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    # OAuth2 uses "username" field, so we treat it as email
    user = db.query(models.User).filter(
        models.User.email == form_data.username
    ).first()

    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    access_token = create_access_token({"user_id": user.id})
    refresh_token = create_refresh_token({"user_id": user.id})

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token
    )




# ------------------------------------------------------------
# Refresh Token Endpoint
# ------------------------------------------------------------
@router.post("/refresh", response_model=TokenResponse)
def refresh_token(refresh_token: str = Header(...)):
    payload = decode_refresh_token(refresh_token)

    new_access_token = create_access_token({"user_id": payload["user_id"]})

    return TokenResponse(
        access_token=new_access_token
    )

