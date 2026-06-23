# Jadeer - Student Portfolio Project Showcase Platform

## Project Overview :

Jadeer is a portfolio and talent showcase platform designed to help students and graduates present their skills, projects, achievements, and professional experiences in a structured and interactive way.

The platform allows users to create and manage personal portfolios containing:

- Personal profile details
- Skills and languages
- Academic and personal projects
- Achievements and certificates
- Uploaded files and media
- Resume/CV information

The system consists of:

- Frontend application built using **Vite + React**
- Backend API built using **FastAPI**
- Local **SQLite database** for data storage

## Requirements :

Frontend Requirements:

- Node.js (18+ recommended)
- npm

Frontend dependencies are listed in:

```bash
frontend/package.json
```

Backend Requirements:

- Python 3.10+
- pip

Backend dependencies are listed in:

```bash
backend/requirements.txt
```

Database Requirements:
SQLite

## Installaion

### Option 1: Clone the repository

```bash
git clone https://github.com/BAbdulmajeed/Jadeer_Portfolios.git
cd Jadeer_Portfolios
```

### Option 2: Use the provided project files

1. Extract the zip file
2. Open the project folder:

```bash
cd Jadeer_Portfolios
```

### Backend Setup

1. Navigate to the backend:

```bash
cd backend
```

2. Create a virtual environment:

```bash
python -m venv venv
```

3. Activate it:

for Windows :

```bash
venv\Scripts\activate
```

for Mac/Linux:

```bash
source venv/bin/activate
```

4. install dependencies:

```bash
pip install -r requirements.txt
```

### Frontend Setup

1. Navigate to the frontend:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

## Run the project

1. start backend:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

2. start fronted:

```bash
npm run dev
```

## API Keys & Environment Variables

No external API keys are required for this project.

The project uses a local SQLite database,
so no external database configuration is needed.

## Known Issues

One limitation is that the platform currently focuses mainly on student users,
with limited functionality for employers. which limits the platform’s ability to
support direct interaction between students and recruiters.
