# Digital Complaint Management & Grievance Portal

A full-stack Capstone Project built with Angular 18, Node.js, Express, and MySQL.

## 🚀 Key Features

*   **Role-Based Access Control**:
    *   **User/Student**: Register, file complaints with details (Category, Priority, Image Attachment), and track status in real-time.
    *   **Staff**: View assigned tasks, update status (In-progress -> Resolved), and view issue attachments.
    *   **Admin**: distinct dashboard to monitor all complaints, view analytics (Total/Open), and assign tasks to staff members.
*   **Advanced Complaint Handling**:
    *   **Priority Levels**: Low, Medium, High.
    *   **Categories**: Plumbing, Electrical, Internet, Facility, etc.
    *   **Image Attachments**: Users can upload images to provide proof/context.
    *   **Resolution Notes**: Staff can add notes when resolving an issue.
*   **Security**:
    *   **SHA-256 Hashing**: Secure password storage.
    *   **Route Guards**: Protected frontend routes based on authentication and roles.

## 🛠️ Tech Stack

*   **Frontend**: Angular 18 (Standalone Components, Reactive Forms)
*   **Backend**: Node.js, Express, TypeScript
*   **Database**: MySQL
*   **Styling**: SCSS (Custom Glassmorphism Design)

## ⚙️ Setup Instructions

### 1. Database Setup
1.  Ensure you have **MySQL** installed and running.
2.  Create a database named `complaint_portal`.
3.  Run the SQL script from `database/schema.sql` to generate tables (`users`, `complaints`).
    *   This includes the necessary columns for Priority, Resolution Notes, and Image Uploads.

### 2. Backend Setup
1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file (if not exists) with database credentials:
    ```env
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=complaint_portal
    DB_PORT=3306
    JWT_SECRET=your_secret_key
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```
    (Runs on `http://localhost:3000`)

### 3. Frontend Setup
1.  Navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the Angular application:
    ```bash
    ng serve -o
    ```
    (Opens automatically at `http://localhost:4200`)

## 📸 Usage

1.  **Register** a new user account.
2.  **File a Complaint**: Go to "New Complaint", fill in details, select priority, and upload an image (optional).
3.  **Admin**: Login as an Admin to assign the complaint to a specific Staff member.
4.  **Staff**: Login as the assigned Staff to view the task and mark it as Resolved.
