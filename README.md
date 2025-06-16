# Full Stack Coding Challenge Application

This is a full-stack application that generates coding challenges using AI and manages user quotas. The application consists of a React frontend and a FastAPI backend.

## Project Structure

```
.
├── frontend/          # React frontend application
└── backend/          # FastAPI backend application
```

## Prerequisites

- Node.js (v16 or higher)
- Python 3.11 or higher
- SQLite3

## Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create and activate a virtual environment:

```bash
python -m venv venv
# On Windows
venv\Scripts\activate
# On Unix or MacOS
source venv/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the backend directory with the following variables:

```env
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
JWT_KEY=your_jwt_key
AI21_API_KEY=your_ai21_api_key
```

5. Run the backend server:

```bash
python server.py
```

The server will start on `http://localhost:8000`

## Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the frontend directory with the following variables:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

4. Start the development server:

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## Backend Dependencies

- fastapi
- uvicorn
- sqlalchemy
- python-dotenv
- clerk-backend-api
- svix
- langchain
- langchain-ai21
- langchain-community
- langchain_ollama

## Frontend Dependencies

- @clerk/clerk-react
- react
- react-dom
- react-router-dom
- vite
- eslint and related plugins

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

## Features

- User authentication using Clerk
- AI-powered coding challenge generation
- User quota management
- Challenge history tracking
- Multiple difficulty levels (easy, medium, hard)

## API Endpoints

- `POST /api/generate-challenge`: Generate a new coding challenge
- `GET /api/my-history`: Get user's challenge history
- `GET /api/quota`: Get user's remaining challenge quota
- `POST /webhooks/clerk`: Handle Clerk webhook events

## Database

The application uses SQLite as its database. The database file is automatically created at `backend/database.db` when the application starts.

## Security

- All API endpoints are protected with Clerk authentication
- Webhook endpoints are secured with Clerk webhook signatures
- Environment variables are used for sensitive configuration
