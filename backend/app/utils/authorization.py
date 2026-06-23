from fastapi import (
    Depends, 
    HTTPException, 
    status
)
from fastapi.security import OAuth2PasswordBearer
from app.utils.jwt import decode_access_token
from app import models
from app.utils.database import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login", auto_error=False)

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db=Depends(get_db)
):
    if not token:
        return type("GuestUser", (), {"id": None})()
    payload = decode_access_token(token)

    if not payload or "user_id" not in payload:
        print("one")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )

    user = db.query(models.User).filter(models.User.id == payload["user_id"]).first()

    if not user:
        print("twe")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )

    return user