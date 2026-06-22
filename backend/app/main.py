from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# Import your routers
from app.routers import (
    auth,
    user,
    portfolio,
    project,
    skill,
    language,
    file,
    project_team_member,
    external_link
)

# Import models and database
from app.utils.database import engine, Base
import app.models

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

# نحدد المواقع المسموح لها بالاتصال بالباك اند
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
]


app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Create tables on startup
@app.on_event("startup")
def create_tables():
    Base.metadata.create_all(bind=engine)

# CORS (mabe required later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(portfolio.router)
app.include_router(project.router)
app.include_router(skill.router)
app.include_router(language.router)
app.include_router(file.router)
app.include_router(project_team_member.router)
app.include_router(external_link.router)

@app.get("/")
def root():
    return {"message": "Backend is running!"}
