# Maintenance Ticket Management Web Application

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-REST%20API-000000?logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?logo=jsonwebtokens&logoColor=white)

A full-stack maintenance ticket management system built to help organizations raise, assign, track, and resolve facility maintenance issues in a structured way.

This project covers a real-world workflow: department users create maintenance tickets, admins assign technicians, technicians update progress, and the system maintains comments, status history, image uploads, and audit logs.

## Author

**Pratik Shelar**

- LinkedIn: <https://www.linkedin.com/in/pratik-shelar-6b66a8286/>
- GitHub: <https://github.com/Pratik-Ghrcemp>

## Quick Navigation

- [Project Highlights](#project-highlights)
- [Screenshots](#screenshots)
- [User Roles](#user-roles)
- [Application Workflow](#application-workflow)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [Database Design](#database-design)
- [API Reference](#api-reference)
- [Local Setup](#local-setup)
- [Demo Accounts](#demo-accounts)
- [Useful Commands](#useful-commands)
- [Security Notes](#security-notes)
- [Future Improvements](#future-improvements)

## Project Highlights

This application is designed for maintenance teams, facility teams, and internal support teams that need clear ticket ownership and status tracking.

| Area | What This Project Does |
| --- | --- |
| Authentication | Secure login, registration, JWT token handling, and protected routes |
| Access Control | Separate permissions for Admin, Technician, and Department User |
| Ticket Management | Create, view, filter, assign, comment, and update ticket status |
| Admin Operations | Manage departments, facilities, areas, categories, and technician assignment |
| Tracking | Ticket comments, status updates, audit logs, and notifications |
| File Upload | Optional ticket image upload for better issue reporting |
| Database | Relational MySQL schema managed through Prisma ORM |
| UI | Responsive React interface with Bootstrap and reusable components |

## Screenshots

The screenshots below are captured from the actual running application and stored in `docs/screenshots/`.

### Authentication and Dashboard

| Sign In | Admin Dashboard |
| --- | --- |
| ![Login Page](docs/screenshots/login.png) | ![Dashboard](docs/screenshots/dashboard.png) |

### Ticket Management

| Ticket List | Ticket Details |
| --- | --- |
| ![Ticket List](docs/screenshots/tickets.png) | ![Ticket Details](docs/screenshots/ticket-details.png) |

### Create and Configure

| Create Ticket | Master Data Management |
| --- | --- |
| ![Create Ticket](docs/screenshots/create-ticket.png) | ![Master Data](docs/screenshots/master-data.png) |

## User Roles

| Role | Responsibility | Access Level |
| --- | --- | --- |
| Admin | Controls the maintenance workflow and master data | Full access |
| Department User | Raises maintenance requests and tracks own tickets | Limited user access |
| Technician | Works on assigned tickets and updates progress | Assigned-ticket access |

### Role-Based Actions

| Action | Admin | Department User | Technician |
| --- | --- | --- | --- |
| Register publicly | No | Yes | Yes |
| Create ticket | Yes | Yes | No |
| View all tickets | Yes | No | No |
| View own/assigned tickets | Yes | Yes | Yes |
| Assign technician | Yes | No | No |
| Update ticket status | Yes | No | Yes |
| Add comments | Yes | Yes | Yes |
| Manage master data | Yes | No | No |

## Application Workflow

```mermaid
flowchart LR
    A[Department User] --> B[Create Maintenance Ticket]
    B --> C[Ticket Stored in MySQL]
    C --> D[Admin Reviews Ticket]
    D --> E[Assign Technician]
    E --> F[Technician Updates Status]
    F --> G[Comments and Audit Logs]
    G --> H[Ticket Resolved or Closed]
```

The flow is simple and practical:

1. A department user reports a maintenance issue.
2. The ticket is created with priority, location, category, description, and optional image.
3. The admin reviews the ticket and assigns a technician.
4. The technician updates the progress from Assigned to In Progress or Resolved.
5. Comments and audit logs keep the communication and history clear.
6. The ticket can be closed after the issue is completed.

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 18, Vite, React Router, Bootstrap 5, React Bootstrap, Axios, Lucide React |
| Backend | Node.js, Express.js, REST API architecture |
| Database | MySQL |
| ORM | Prisma ORM |
| Authentication | JWT, bcryptjs |
| Uploads | Multer |
| Security | Helmet, CORS, Express Rate Limit, Express Validator |
| Development | npm, Nodemon, Prisma Studio |

## Architecture

```mermaid
flowchart TB
    Browser[React Frontend]
    API[Express REST API]
    Auth[JWT Auth Middleware]
    Services[Service Layer]
    Prisma[Prisma ORM]
    DB[(MySQL Database)]
    Uploads[Local Upload Storage]

    Browser -->|Axios Requests| API
    API --> Auth
    API --> Services
    Services --> Prisma
    Prisma --> DB
    API --> Uploads
```

### Backend Layering

| Layer | Purpose |
| --- | --- |
| Routes | Defines API endpoints and attaches middleware |
| Controllers | Handles request and response flow |
| Services | Contains main business logic |
| Validations | Validates request body, params, and query values |
| Middleware | Handles auth, errors, logs, uploads, and not-found responses |
| Prisma | Handles database queries and model relationships |

### Frontend Layering

| Layer | Purpose |
| --- | --- |
| Pages | Main screens such as Dashboard, Tickets, Login, Register |
| Components | Reusable UI blocks such as tables, filters, badges, modals |
| Context | Authentication and toast notification state |
| Services | API calls for auth, tickets, health, and master data |
| Routes | Protected route handling and page navigation |
| Styles | Global UI styling |

## Folder Structure

The project is split into a React client and an Express server.

```text
maintenance-ticket-management-web-application/
|
|-- client/                         React frontend
|   |-- src/
|   |   |-- api/                     Axios instance and response helpers
|   |   |-- components/              Reusable UI components
|   |   |-- context/                 Auth and toast providers
|   |   |-- hooks/                   Custom React hooks
|   |   |-- layouts/                 Main app layout
|   |   |-- pages/                   Application pages
|   |   |-- routes/                  App routing and protected routes
|   |   |-- services/                Frontend API service functions
|   |   |-- styles/                  Global styles
|   |   `-- utils/                   Shared frontend constants
|   |-- .env.example
|   `-- package.json
|
|-- server/                         Express backend
|   |-- config/                     Environment and CORS config
|   |-- controllers/                API request handlers
|   |-- database/                   Prisma client setup
|   |-- middleware/                 Auth, error, upload, logger middleware
|   |-- prisma/                     Prisma schema, migrations, seed data
|   |-- routes/                     API route definitions
|   |-- services/                   Business logic
|   |-- uploads/                    Uploaded ticket images
|   |-- utils/                      Helpers and constants
|   |-- validations/                Express-validator rules
|   |-- .env.example
|   |-- app.js
|   `-- server.js
|
|-- docs/
|   `-- screenshots/               README screenshots
|
|-- package.json                    Root scripts
|-- package-lock.json
|-- .gitignore
`-- README.md
```

## Database Design

The database is designed around users, tickets, master data, comments, and tracking history.

| Module | Purpose |
| --- | --- |
| Users | Stores admin, department user, and technician accounts |
| Departments | Groups users and tickets by department |
| Facilities | Represents buildings or locations |
| Areas | Represents facility-specific areas |
| Categories | Defines issue types such as electrical, plumbing, cleaning |
| Technicians | Stores technician-specific records |
| Tickets | Main maintenance request records |
| Ticket Comments | Stores discussion and updates on tickets |
| Audit Logs | Tracks important ticket actions |
| Notifications | Stores user notifications |

## API Reference

Base URL:

```text
http://localhost:5000/api/v1
```

### Authentication APIs

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| POST | `/auth/register` | Register department user or technician | Public |
| POST | `/auth/login` | Login and receive JWT token | Public |
| POST | `/auth/logout` | Logout current user | Authenticated |
| GET | `/auth/me` | Get current logged-in user | Authenticated |
| GET | `/auth/departments` | Get active departments for registration | Public |

### Ticket APIs

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| GET | `/tickets` | List tickets with filters and pagination | Authenticated |
| POST | `/tickets` | Create a new ticket | Admin, Department User |
| GET | `/tickets/:id` | Get ticket details | Authorized ticket user |
| PATCH | `/tickets/:id/assign` | Assign technician to ticket | Admin |
| PATCH | `/tickets/:id/status` | Update ticket status | Admin, Technician |
| POST | `/tickets/:id/comments` | Add ticket comment | Authorized ticket user |
| GET | `/tickets/stats` | Get dashboard ticket counts | Authenticated |
| GET | `/tickets/technicians` | Get active technicians | Authenticated |

### Master Data APIs

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| GET | `/master-data/:resource` | List master data records | Authenticated |
| GET | `/master-data/:resource/:id` | Get one master data record | Authenticated |
| POST | `/master-data/:resource` | Create master data record | Admin |
| PUT | `/master-data/:resource/:id` | Update master data record | Admin |
| DELETE | `/master-data/:resource/:id` | Delete master data record | Admin |

Supported master data resources:

```text
departments
facilities
areas
categories
```

## Local Setup

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

If your database password contains special URL characters such as `@`, encode them in the database URL. For example, `@` becomes `%40`.

### 4. Create MySQL Database

```sql
CREATE DATABASE maintenance_ticket_db;
```

### 5. Prepare Prisma and Demo Data

```bash
npm run prisma:generate
npm run prisma:migrate
npm run db:seed
```

The seed command creates sample departments, facilities, areas, categories, users, tickets, comments, audit logs, and notifications.

### 6. Run the Application

Start backend:

```bash
npm run dev:server
```

Start frontend in another terminal:

```bash
npm run dev:client
```

Open:

```text
Frontend: http://localhost:5173
Backend Health API: http://localhost:5000/api/v1/health
```

## Demo Accounts

Use these accounts after running the seed command:

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@example.com` | `Password123` |
| Technician | `technician@example.com` | `Password123` |
| Department User | `user@example.com` | `Password123` |

Public registration is limited to department users and technicians. Admin accounts should be created only through a trusted setup or admin/database workflow.

## Useful Commands

| Command | Description |
| --- | --- |
| `npm run install:all` | Install server and client dependencies |
| `npm run dev:server` | Start backend server |
| `npm run dev:client` | Start frontend app |
| `npm run build:client` | Build frontend for production |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate` | Run database migration |
| `npm run db:seed` | Insert demo data |

## Verification

The project was verified with:

```bash
npm run build:client
cd server
npm exec prisma validate
```

## Security Notes

- Passwords are hashed with bcryptjs.
- JWT protects private API routes.
- Public registration does not allow admin account creation.
- Request validation is handled with express-validator.
- Helmet adds security-related HTTP headers.
- Rate limiting helps reduce repeated request abuse.
- `.env` files are ignored and should not be uploaded to GitHub.

## Future Improvements

- Email notifications for ticket assignment and ticket updates.
- Technician workload and performance dashboard.
- Export ticket reports as PDF or Excel.
- Password reset flow.
- Cloud deployment with production environment configuration.
- Advanced analytics for repeated maintenance issues.

## GitHub Upload Notes

Upload these important project files and folders:

```text
client/
server/
docs/screenshots/
README.md
package.json
package-lock.json
.gitignore
server/.env.example
client/.env.example
```

Do not upload:

```text
node_modules/
client/node_modules/
server/node_modules/
client/dist/
server/.env
client/.env
server/uploads/
*.log
```

## Project Summary

This Maintenance Ticket Management Web Application provides a complete workflow for creating, assigning, tracking, and resolving maintenance tickets. It demonstrates full-stack development skills using React, Node.js, Express, Prisma, and MySQL, with practical features such as authentication, role-based permissions, REST APIs, database relationships, image uploads, validations, and a clean modular code structure.
