# Task Manager App

A full-stack task manager application built with Spring Boot, Angular, and Docker.

## Features

- 🔐 Authentication with JWT
  - User registration and login
  - Protected routes
  - Token-based authentication
  - Role-based access control (ADMIN, USER)

- 📋 Task Management
  - Create, read, update, and delete tasks
  - Task status tracking (TODO, IN_PROGRESS, DONE)
  - Task priority levels (HIGH, MEDIUM, LOW)
  - Task categories and tags
  - Task comments and attachments
  - Due date management
  - Task filtering by status

- 🎨 Modern UI
  - Material Design components
  - Responsive layout
  - User-friendly forms
  - Real-time feedback
  - Dark/Light theme support
  - Mobile-first design
  - Accessibility compliance

- 🛠️ DevOps
  - Dockerized deployment
  - PostgreSQL database
  - Nginx for frontend serving
  - Environment configuration
  - CI/CD pipeline support
  - Health monitoring
  - Logging and metrics

## Prerequisites

- Docker and Docker Compose
  - Docker Engine 24.0.0 or later
  - Docker Compose v2.20.0 or later
- Java 17 or later
  - OpenJDK 17 recommended
  - Maven 3.8.0 or later
- Node.js 20 or later
  - npm 10.0.0 or later
- Angular CLI 17 or later
- PostgreSQL 16 or later (if running locally)

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd task-manager
   ```

2. Start the application using Docker Compose:

   ```bash
   docker-compose up --build
   ```

   This will start:
   - PostgreSQL database on port 5432
   - Spring Boot backend on port 8080
   - Angular frontend on port 80

3. Access the application:
   - Frontend: <http://localhost>
   - Backend API: <http://localhost:8080/api>
   - Swagger UI: <http://localhost:8080/api/swagger-ui.html>
   - Database: localhost:5432

## Development

### Backend Development

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Run the Spring Boot application:

   ```bash
   ./mvnw spring-boot:run
   ```

3. Backend development features:
   - Hot reload enabled
   - Debug port: 5005
   - Test coverage reports
   - API documentation auto-generation

### Frontend Development

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   ng serve
   ```

4. Frontend development features:
   - Hot module replacement
   - Source maps enabled
   - ESLint configuration
   - Prettier formatting
   - Unit testing with Jest
   - E2E testing with Cypress

## API Documentation

The API documentation is available through Swagger UI at:
<http://localhost:8080/api/swagger-ui.html>

API features:

- OpenAPI 3.0 specification
- Interactive documentation
- Request/response examples
- Authentication support
- Schema validation

## Configuration

### Environment Variables Configuration

The application uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

#### Database Environment Variables

- `POSTGRES_DB`: Database name (defaults to taskmanager)
- `POSTGRES_USER`: PostgreSQL username (defaults to postgres)
- `POSTGRES_PASSWORD`: PostgreSQL password (defaults to postgres)

#### JWT Environment Variables

- `JWT_SECRET`: Secret key for JWT token signing (required)

#### Server Environment Variables

- `SERVER_PORT`: Backend server port (defaults to 8080)
- `API_URL`: Frontend API URL (defaults to <http://localhost:8080/api>)

#### Rate Limiting Environment Variables

- `RATE_LIMIT_AUTH_REQUESTS`: Rate limit for auth requests (defaults to 5)
- `RATE_LIMIT_AUTH_PERIOD`: Rate limit period in seconds (defaults to 60)
- `RATE_LIMIT_API_REQUESTS`: Rate limit for API requests (defaults to 100)
- `RATE_LIMIT_API_PERIOD`: Rate limit period in seconds (defaults to 60)

#### Security Environment Variables

- `PASSWORD_MIN_LENGTH`: Minimum password length (defaults to 12)
- `PASSWORD_MAX_ATTEMPTS`: Maximum login attempts (defaults to 5)
- `PASSWORD_LOCKOUT_DURATION`: Account lockout duration in milliseconds (defaults to 900000)

#### CORS Environment Variables

- `CORS_ALLOWED_ORIGINS`: Comma-separated list of allowed origins (defaults to <http://localhost:4200>)

#### Logging Environment Variables

- `LOG_LEVEL`: Root log level (defaults to INFO)
- `LOG_LEVEL_COM_TASKMANAGER`: Application log level (defaults to DEBUG)
- `LOG_LEVEL_ORG_SPRINGFRAMEWORK_SECURITY`: Security log level (defaults to DEBUG)

### Docker Services Configuration

The application uses Docker Compose for orchestration with the following services:

#### PostgreSQL Service Configuration

- Image: postgres:16-alpine
- Port: 5432
- Persistent volume: postgres_data
- Environment variables from .env file

#### Backend Service Configuration

- Build context: ./backend
- Port: 8080
- Environment variables:
  - Database configuration
  - JWT configuration
  - Spring Boot configuration
- Development watch mode for hot reload

#### Frontend Service Configuration

- Build context: ./frontend
- Port: 80
- Environment variables:
  - API_URL for backend communication
- Development watch mode for hot reload

### Backend Application Configuration

#### Backend Server Settings

- Port: 8080
- Context path: /api
- Servlet container: Tomcat
- OpenAPI/Swagger UI enabled
- API documentation at /api-docs and /swagger-ui.html

#### Backend Database Settings

- Type: PostgreSQL 16 (Alpine)
- Connection pool: HikariCP
- JPA/Hibernate configuration:
  - DDL auto: update
  - Show SQL: true
  - Format SQL: true
  - Open in view: false

#### Backend Security Settings

- JWT token expiration: 24 hours
- Refresh token expiration: 7 days
- Password encoder: BCrypt
- CORS configuration:
  - Allowed origins: <http://localhost>, <http://localhost:4200>
  - Allowed methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
  - Allowed headers: Authorization, Content-Type, Accept, etc.
  - Max age: 3600 seconds
- CSRF protection: Disabled (stateless API)
- Session management: Stateless

### Frontend Application Configuration

#### Frontend Build Settings

- Production build:
  - Initial budget: 500kB (warning), 1MB (error)
  - Component style budget: 4kB (warning), 8kB (error)
  - Output hashing: all
- Development build:
  - Optimization: disabled
  - Source maps: enabled
  - License extraction: disabled

#### Frontend Nginx Settings

- Port: 80
- Root: /usr/share/nginx/html
- Index: index.csr.html
- Gzip compression enabled
- Angular routing support
- API proxy configuration:
  - Proxy pass: <http://backend:8080>
  - Timeouts: 60s
  - WebSocket support
- Static asset caching:
  - Images, CSS, JS: 1 year
  - HTML: no cache

#### Frontend Performance Settings

- Lazy loading: Enabled
- Server-side rendering: Enabled
- Service worker: Enabled
- Compression: Enabled
- Minification: Enabled (production)
- Source maps: Development only

### Development Environment Configuration

#### Development Ports Configuration

- Frontend:
  - Development: 4200
  - Production: 80
- Backend:
  - API: 8080
  - Debug: 5005
- Database: 5432

## Troubleshooting

### Common Issues and Solutions

#### Nginx Default Page Instead of Angular App

If you see the Nginx default page instead of the Angular application:

1. Check if the containers are running:

   ```bash
   docker-compose ps
   ```

2. Verify the Nginx configuration:

   ```bash
   docker exec task-manager-frontend-1 cat /etc/nginx/conf.d/default.conf
   ```

3. Check the build output location:

   ```bash
   docker exec task-manager-frontend-1 ls -la /usr/share/nginx/html
   ```

4. Clear browser cache or try in incognito mode

5. Check if port 80 is available:

   ```bash
   sudo lsof -i :80
   ```

#### Angular Build Issues

If you encounter build issues:

1. Clean the build artifacts:

   ```bash
   rm -rf frontend/node_modules frontend/dist
   ```

2. Rebuild the frontend:

   ```bash
   cd frontend
   npm install
   npm run build -- --configuration production
   ```

3. Check the build output structure:

   ```bash
   ls -la dist/frontend
   ```

#### Database Connection Issues

If you have database connection problems:

1. Check if PostgreSQL is running:

   ```bash
   docker-compose ps postgres
   ```

2. View database logs:

   ```bash
   docker-compose logs postgres
   ```

3. Verify database connection:

   ```bash
   docker exec task-manager-postgres-1 psql -U postgres -d taskmanager
   ```
