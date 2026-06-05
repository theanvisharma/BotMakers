# Full Stack Authentication & Role-Based Access Control (RBAC) System

This is a complete full-stack web application demonstrating secure user authentication, JWT token management, and Role-Based Access Control (RBAC). 

## 🚀 Features
- **Secure Authentication**: User registration and login utilizing JSON Web Tokens (JWT).
- **Role-Based Authorization**: Distinct roles (`USER` and `ADMIN`) with protected API endpoints and tailored frontend experiences.
- **Modern UI/UX**: Built with React, TailwindCSS, and stunning interactive animations (React Bits, Magic Rings, Reflective Cards, Bento grids).
- **Form Validation**: Client-side validation using React Hook Form.
- **Data Fetching**: Optimized API calls using TanStack React Query and Axios.
- **API Documentation**: Auto-generated Swagger UI for backend endpoints.

## 🛠️ Technologies Used

### Backend
- **Java 17** & **Spring Boot 3**
- **Spring Security** + **JWT**
- **Spring Data JPA** + **Hibernate**
- **H2 In-Memory Database** (Zero setup required)
- **MapStruct** & **Lombok**
- **Maven**
- **Swagger / OpenAPI**

### Frontend
- **React 18** + **TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Router DOM**
- **React Query** & **Axios**
- **React Hook Form**
- **GSAP** & **Three.js** (for animations)

---

## 💻 Setup Instructions

### Prerequisites
- **Java 17** installed on your system.
- **Node.js** (v18 or higher) and npm.

### 1. Start the Backend
The backend runs on an in-memory H2 database, so no external database configuration is necessary. It will build its own tables automatically on startup!

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Run the Spring Boot application using the Maven wrapper:
   ```bash
   # On Windows:
   .\mvnw clean spring-boot:run
   
   # On Mac/Linux:
   ./mvnw clean spring-boot:run
   ```
3. The server will start on `http://localhost:8080`.
4. *Optional:* You can view the API documentation at `http://localhost:8080/swagger-ui/index.html`.

### 2. Start the Frontend
1. Open a **new, separate** terminal window and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. The frontend will be available at `http://localhost:5173`. Open this link in your browser.

---

## 🧪 Testing the Application

1. **Register a User**: Go to `http://localhost:5173/register`. Select the "Member" role, enter your details, and submit. You will be routed to the User Dashboard.
2. **Register an Admin**: Go back to the register page. Select the "Admin" role. **Note: Ensure you use a DIFFERENT email address**, as emails must be unique. You will be routed to the Admin Dashboard.
3. **Log In / Log Out**: Test logging out using the top-right button, and logging back in with your newly created credentials to see the routing system automatically direct you to the correct dashboard based on your role.

## 👨‍💻 Author
Made by **Anvi Sharma** • `theanvisharma@gmail.com`
