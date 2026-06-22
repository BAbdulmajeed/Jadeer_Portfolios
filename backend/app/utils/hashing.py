from pwdlib import PasswordHash

pwd_context = PasswordHash.recommended()  # uses Argon2id by default

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)
