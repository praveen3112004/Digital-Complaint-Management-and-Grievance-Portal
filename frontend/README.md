# Digital Complaint Management & Grievance Portal

A full-stack Capstone Project built with Angular 18, Node.js, Express, and MySQL.

## Project Structure
- `frontend/`: Angular 18 application (Client).
- `backend/`: Node.js + Express API (Server).
- `database/`: SQL Schema.

## Prerequisites
- Node.js (v18+)
- MySQL Server

## Setup Instructions

### 1. Database Setup
1. Open your MySQL client (Workbench, CLI, etc.).
2. Run the script in `database/schema.sql`.
3. This creates the `complaint_portal` database, `users` table, and `complaints` table.

### 2. Backend Setup
1. Navigate to backend: `cd backend`
2. Install dependencies: `npm install`
3. Configure `.env`:
   - Open `.env` and update `DB_PASSWORD` to your MySQL root password.
4. Start Server:
   - Dev Mode: `npx nodemon`
   - Build & Run: `npx tsc && node dist/server.js`
   - API runs on: `http://localhost:3000`

### 3. Frontend Setup
1. Navigate to frontend: `cd frontend`
2. Install dependencies: `npm install`
3. Start Application: `ng serve`
4. Open browser: `http://localhost:4200`

## System Architecture
- **Frontend**: Angular 18 standalone components, Angular Material (Table/Paginator), Custom "Creative" SCSS design.
- **Backend**: Express.js REST API with TypeScript, MySQL2 connection pool.
- **Auth**: Simple Role-based Access Control (RBAC) via custom headers (simulated token). Guarded Routes in Angular.

## Key Features
- **User**: Register, Login, File Complaint, View My Complaints.
- **Staff**: View Assigned Complaints, Update Status (In-progress -> Resolved).
- **Admin**: View All Complaints, Analytics (Count), Assign Staff.

## Sample API Usage

**Register User:**
```http
POST /api/users/register
{
  "name": "Jane User",
  "email": "jane@example.com",
  "password": "password123",
  "role": "User"
}
```

**File Complaint:**
```http
POST /api/complaints
Headers: x-user-id: 1, x-user-role: User
{
  "title": "Broken Chair",
  "category": "Facility",
  "description": "Chair leg is broken in Room 202"
}
```
