Event Management - Full project (frontend + backend + sqlite)

Structure:
- backend/         -> Node.js + Express server (APIs) and sqlite DB
- frontend/        -> Your uploaded frontend files (served statically by backend)
- README.md

Quick start (local):
1. Install Node.js (>=18). In backend folder run:
   cd backend
   npm install
   npm start

2. Open your browser to http://localhost:3000/
   - API endpoints available under /api (e.g., GET /api/users)

Notes:
- The backend uses SQLite (backend/data.sqlite). The server will create tables automatically.
- If your original frontend files already contain APIs calls, they should work as long as
  they expect the endpoints: /api/users, /api/vendors, /api/events.