# Maintenance Ticket Management Web Application

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/API-Express.js-lightgrey)
![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748)
![MySQL](https://img.shields.io/badge/Database-MySQL-orange)

A full-stack web application for managing maintenance complaints, assigning technicians, tracking ticket status, and maintaining service history inside an organization.

This project is designed as a practical portfolio project. It demonstrates frontend development, backend REST API development, authentication, role-based access control, database modeling, file upload handling, validations, and clean project architecture.

## Developed By

**Pratik Shelar**

- LinkedIn: <https://www.linkedin.com/in/pratik-shelar-6b66a8286/>
- GitHub: <https://github.com/Pratik-Ghrcemp>

## Table of Contents

- [Project Overview](#project-overview)
- [Project Screenshots](#project-screenshots)
- [Key Features](#key-features)
- [User Roles](#user-roles)
- [Project Flow](#project-flow)
- [Tools and Technologies](#tools-and-technologies)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Database Modules](#database-modules)
- [API Overview](#api-overview)
- [Installation and Setup](#installation-and-setup)
- [Demo Login Details](#demo-login-details)
- [Run the Project](#run-the-project)
- [Verification](#verification)
- [Security Notes](#security-notes)
- [Future Scope](#future-scope)
- [Important Notes](#important-notes)

## Project Overview

In many organizations, maintenance issues are handled manually through calls, messages, or paper records. This creates problems such as delayed assignments, unclear responsibility, missing status updates, and poor tracking.

This application solves that problem by providing a centralized ticket management system where:

- Department users can raise maintenance tickets.
- Admin users can assign technicians and manage operational data.
- Technicians can work on assigned tickets and update progress.
- Every ticket has status, priority, comments, image support, and audit history.

## Project Screenshots

The screenshots below are stored inside the `docs/screenshots/` folder and will display directly on GitHub.

| Login Page | Dashboard |
| --- | --- |
| ![Login Page](docs/screenshots/login.png) | ![Dashboard](docs/screenshots/dashboard.png) |

| Ticket List | Ticket Details |
| --- | --- |
| ![Ticket List](docs/screenshots/tickets.png) | ![Ticket Details](docs/screenshots/ticket-details.png) |

| Create Ticket | Master Data |
| --- | --- |
| ![Create Ticket](docs/screenshots/create-ticket.png) | ![Master Data](docs/screenshots/master-data.png) |

Screenshot files used in this README:

```text
docs/screenshots/login.png
docs/screenshots/dashboard.png
docs/screenshots/tickets.png
docs/screenshots/ticket-details.png
docs/screenshots/create-ticket.png
docs/screenshots/master-data.png
```

## Key Features

- JWT-based authentication for secure login and user sessions.
- Public registration for department users and technicians.
- Role-based access control for Admin, Technician, and Department User.
- Dashboard with ticket status summary.
- Create tickets with title, description, department, facility, area, category, priority, and optional image.
- Ticket listing with search, filters, and pagination.
- Admin-only technician assignment.
- Status update flow for admins and technicians.
- Ticket comments for communication.
- Audit logs for important ticket actions.
- Master data management for departments, facilities, areas, and categories.
- MySQL database integration using Prisma ORM.
- Backend security features using Helmet, CORS, validation, and rate limiting.

## User Roles

| Role | Main Access |
| --- | --- |
| Admin | Manage master data, view all tickets, assign technicians, update ticket status, monitor dashboard |
| Department User | Create tickets, upload ticket image, view own tickets, add comments |
| Technician | View assigned tickets, add comments, update ticket progress |

## Project Flow

1. User logs in or registers as a department user or technician.
2. Department user creates a maintenance ticket.
3. Admin reviews tickets from dashboard or ticket list.
4. Admin assigns a technician to the ticket.
5. Technician starts work and updates ticket status.
6. Users can add comments for updates and communication.
7. The system records important actions in audit logs.
8. Ticket is resolved and closed after the maintenance work is completed.

## Tools and Technologies

### Frontend

- React 18
- Vite
- React Router
- Bootstrap 5
- React Bootstrap
- Axios
- Lucide React Icons

### Backend

- Node.js
- Express.js
- Prisma ORM
- MySQL
- JWT Authentication
- bcryptjs
- Multer
- Helmet
- CORS
- Express Validator
- Express Rate Limit

### Development Tools

- npm
- Nodemon
- Prisma Studio
- GitHub

## Architecture Overview

```text
React Frontend
      |
      | Axios HTTP Requests
      v
Express.js REST API
      |
      | Prisma ORM
      v
MySQL Database
```

The project follows a layered architecture:

- Frontend handles UI, routing, forms, API calls, auth context, and user interactions.
- Backend handles API routes, controllers, services, middleware, validations, and error handling.
- Prisma handles database models, migrations, and database queries.
- MySQL stores users, tickets, comments, audit logs, and master data.

## Project Structure

```text
.
|-- client/
|   |-- src/
|   |   |-- api/
|   |   |-- components/
|   |   |-- context/
|   |   |-- hooks/
|   |   |-- layouts/
|   |   |-- pages/
|   |   |-- routes/
|   |   |-- services/
|   |   |-- styles/
|   |   `-- utils/
|   |-- .env.example
|   |-- package.json
|   `-- vite.config.js
|-- server/
|   |-- config/
|   |-- controllers/
|   |-- database/
|   |-- middleware/
|   |-- prisma/
|   |-- routes/
|   |-- services/
|   |-- uploads/
|   |-- utils/
|   |-- validations/
|   |-- .env.example
|   |-- app.js
|   `-- server.js
|-- docs/
|   `-- screenshots/
|-- package.json
`-- README.md
```

## Database Modules

- Users
- Departments
- Facilities
- Areas
- Categories
- Technicians
- Tickets
- Ticket Comments
- Audit Logs
- Notifications

## API Overview

### Authentication

```text
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
GET  /api/v1/auth/me
GET  /api/v1/auth/departments
```

### Tickets

```text
GET   /api/v1/tickets
POST  /api/v1/tickets
GET   /api/v1/tickets/:id
PATCH /api/v1/tickets/:id/assign
PATCH /api/v1/tickets/:id/status
POST  /api/v1/tickets/:id/comments
GET   /api/v1/tickets/stats
GET   /api/v1/tickets/technicians
```

### Master Data

```text
GET    /api/v1/master-data/:resource
GET    /api/v1/master-data/:resource/:id
POST   /api/v1/master-data/:resource
PUT    /api/v1/master-data/:resource/:id
DELETE /api/v1/master-data/:resource/:id
```

Valid master data resources:

```text
departments, facilities, areas, categories
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Maintenance-Ticket-Management-Web-Application
```

### 2. Install Dependencies

```bash
npm run install:all
```

### 3. Create Environment Files

```bash
copy server\.env.example server\.env
copy client\.env.example client\.env
```

Server `.env` example:

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
API_PREFIX=/api/v1
DATABASE_URL="mysql://root:your_password@localhost:3306/maintenance_ticket_db"
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=1d
```

Client `.env` example:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

If your database password contains special URL characters such as `@`, encode them in `DATABASE_URL`. For example, `@` becomes `%40`.

### 4. Create MySQL Database

```sql
CREATE DATABASE maintenance_ticket_db;
```

### 5. Generate Prisma Client, Run Migration, and Seed Data

```bash
npm run prisma:generate
npm run prisma:migrate
npm run db:seed
```

The seed command creates sample departments, facilities, areas, categories, users, tickets, comments, audit logs, and notifications.

## Demo Login Details

Use these accounts after running the seed command:

```text
Admin: admin@example.com / Password123
Technician: technician@example.com / Password123
Department User: user@example.com / Password123
```

Public registration is limited to department users and technicians. Admin accounts should be created only through trusted setup or database/admin workflow.

## Run the Project

Start the backend server:

```bash
npm run dev:server
```

Start the frontend app in another terminal:

```bash
npm run dev:client
```

Open in browser:

```text
Frontend: http://localhost:5173
Backend Health API: http://localhost:5000/api/v1/health
```

## Useful Scripts

| Command | Description |
| --- | --- |
| `npm run install:all` | Install server and client dependencies |
| `npm run dev:server` | Start backend in development mode |
| `npm run dev:client` | Start frontend in development mode |
| `npm run build:client` | Build frontend for production |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate` | Run Prisma migration |
| `npm run db:seed` | Insert demo data |

## Verification

The project was verified with:

```bash
npm run build:client
cd server
npm exec prisma validate
```

## Security Notes

- Passwords are hashed using bcryptjs.
- JWT is used for protected API routes.
- Admin registration is not public.
- Backend request validation is handled using express-validator.
- Helmet is used for security-related HTTP headers.
- Rate limiting is enabled to reduce repeated request abuse.
- `.env` files should not be committed to GitHub.

## Future Scope

- Email notifications for ticket assignment and status updates.
- Technician workload dashboard.
- Export ticket reports as PDF or Excel.
- Advanced analytics for maintenance performance.
- Password reset flow.
- Deployment on cloud hosting.

## Important Notes

- Make sure MySQL is running before starting the backend.
- Make sure `DATABASE_URL` has the correct username, password, host, port, and database name.
- Use a strong `JWT_SECRET` value in production.
- If Prisma generate fails on Windows because a Node process is using Prisma, stop the running server and try again.

## Project Summary

This Maintenance Ticket Management Web Application provides a complete workflow for raising, assigning, tracking, and resolving maintenance tickets. It is built with React, Node.js, Express, Prisma, and MySQL, and it demonstrates strong full-stack development fundamentals with authentication, role-based access, REST APIs, database design, image upload support, and clean code organization.
