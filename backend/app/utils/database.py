# Import the required libraries
from sqlalchemy import create_engine
from sqlalchemy.orm import (
    declarative_base, 
    sessionmaker
)

# Define the database URL
DATABASE_URL = "sqlite:///./app/jadeer_portfolio.db"

# Create the engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

# Create the session for talking to the database
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
    )

# Create the base class
# All your models will inherit from this Base
Base = declarative_base()

# helper function for dependency injection
# This lets routers easily get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

