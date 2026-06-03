 🔐 Full Stack Authentication & RBAC System

A full-stack web application demonstrating **JWT-based authentication** and **role-based access control (RBAC)** using:

* **Backend:** Java 17, Spring Boot, Spring Security, JWT, JPA
* **Frontend:** React (TypeScript), Vite, React Query, Axios, TailwindCSS

---

## 🚀 Features

### 🔑 Authentication

* User registration with:

  * Name
  * Email
  * Password (encrypted using BCrypt)
  * Role (USER / ADMIN)
* Secure login with JWT token generation
* Stateless authentication using JWT

### 🛡️ Authorization (RBAC)

* Two roles supported:

  * **USER** → Access user-level content
  * **ADMIN** → Access admin-level content
* Protected API endpoints based on roles

### 🌐 Frontend Features

* Login & Registration forms
* JWT token storage in localStorage
* Automatic token attachment to API requests
* Role-based UI rendering
* Protected routes

---

## 🏗️ Tech Stack

### Backend

* Java 17
* Spring Boot
* Spring Security
* JWT (JSON Web Token)
* Spring Data JPA + Hibernate
* MapStruct
* Lombok
* Maven
* Swagger / OpenAPI

### Frontend

* React + TypeScript
* Vite
* React Router
* React Query
* Axios
* React Hook Form
* TailwindCSS

---

## 📁 Project Structure

### Backend

```
src/main/java/com/example/
│
├── controller
├── service
├── repository
├── entity
├── dto
├── security
│   ├── JwtUtil
│   ├── JwtFilter
│   └── SecurityConfig
└── mapper
```

### Frontend

```
src/
│
├── pages
│   ├── Login.tsx
│   ├── Register.tsx
│   └── Dashboard.tsx
│
├── components
├── routes
├── services (API calls)
├── hooks
└── utils (auth helpers)
```

---

## 🔐 Authentication Flow

1. User registers with details and role
2. User logs in with email & password
3. Backend validates credentials
4. JWT token is generated and returned
5. Frontend stores token in localStorage
6. Token is attached to every protected API request
7. Backend validates token and grants access based on role

---

## 🧭 API Endpoints

### Public

```
GET /api/public
```

### User Access

```
GET /api/user
```

### Admin Access

```
GET /api/admin
```

### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

---

## 🧪 Role-Based Access Rules

| Role  | Access                 |
| ----- | ---------------------- |
| USER  | User endpoints only    |
| ADMIN | User + Admin endpoints |

---

## 🎨 Frontend Pages

* `/register` → Create account
* `/login` → Authenticate user
* `/dashboard` → Role-based content display

---

## 🔒 Security Implementation

* Passwords encrypted using BCrypt
* JWT used for stateless authentication
* Spring Security filters protect endpoints
* Role-based authorization using `@PreAuthorize` / config rules
* Token validation on every request

---

## ⚙️ Setup Instructions

### Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs at:

```
http://localhost:8080
```

Swagger UI:

```
http://localhost:8080/swagger-ui.html
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 📌 Environment Variables

### Backend

```
JWT_SECRET=your_secret_key
DB_URL=your_database_url
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

---

## 🧠 Key Learnings

* JWT authentication flow
* Spring Security configuration
* Role-based access control
* Full-stack authentication architecture
* Secure API design principles

---

## ⚠️ Notes

* This project uses JWT-based stateless authentication
* Frontend stores token in localStorage (for demo purposes)
* Role-based access is enforced both on frontend and backend
---

## 📄 License

This project is created as part of an internship assignment.

---
