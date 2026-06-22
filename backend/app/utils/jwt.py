from fastapi import HTTPException
from datetime import (
    datetime, 
    timedelta
)
from jose import (
    jwt, 
    JWTError, 
    ExpiredSignatureError
)

SECRET_KEY = "ACCESS_SECRET"
REFRESH_SECRET_KEY = "REFRESH_SECRET"
ALGORITHM = "HS256"
ACCESS_EXPIRE_MINUTES = 15
REFRESH_EXPIRE_HOURS = 3

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_EXPIRE_MINUTES)
    to_encode["exp"] = expire
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=REFRESH_EXPIRE_HOURS)
    to_encode["exp"] = expire
    return jwt.encode(to_encode, REFRESH_SECRET_KEY, algorithm=ALGORITHM)

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except ExpiredSignatureError:
        raise HTTPException(
            status_code=401,
            detail="Token expired"
        )
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

def decode_refresh_token(token: str):
    return jwt.decode(token, REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
