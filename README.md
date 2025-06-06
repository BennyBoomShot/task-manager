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

## Environment Variables

### Backend

```properties
# Database Configuration
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/taskmanager
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_SHOW_SQL=true
SPRING_JPA_PROPERTIES_HIBERNATE_FORMAT_SQL=true
SPRING_JPA_OPEN_IN_VIEW=false

# JWT Configuration
JWT_SECRET=xXs52jwF9Uw4CPhzI1uPSbBxZvx0oyGhioe60LkCkuI=
JWT_EXPIRATION=86400000
JWT_REFRESH_EXPIRATION=604800000

# Server Configuration
SERVER_PORT=8080
SERVER_SERVLET_CONTEXT_PATH=/api

# Swagger/OpenAPI Configuration
SPRINGDOC_API_DOCS_PATH=/api-docs
SPRINGDOC_SWAGGER_UI_PATH=/swagger-ui.html
SPRINGDOC_SWAGGER_UI_OPERATIONS_SORTER=method

# Logging Configuration
LOGGING_LEVEL_ROOT=INFO
LOGGING_LEVEL_COM_TASKMANAGER=DEBUG
LOGGING_LEVEL_ORG_SPRINGFRAMEWORK_SECURITY=DEBUG
```

### Frontend

```properties
# API Configuration
API_URL=http://localhost:8080/api

# Angular Configuration
ANGULAR_APP_ENV=production
ANGULAR_APP_VERSION=1.0.0
```

## Configuration

### Backend Configuration

The backend uses Spring Boot 3.2.3 with the following configurations:

#### Server Configuration

- Port: 8080
- Context path: /api
- Servlet container: Tomcat
- OpenAPI/Swagger UI enabled
- API documentation at /api-docs and /swagger-ui.html

#### Database Configuration

- Type: PostgreSQL 16 (Alpine)
- Connection pool: HikariCP
- JPA/Hibernate configuration:
  - DDL auto: update
  - Show SQL: true
  - Format SQL: true
  - Open in view: false

#### Security Configuration

- JWT token expiration: 24 hours
- Refresh token expiration: 7 days
- Password encoder: BCrypt
- CORS configuration:
  - Allowed origins: http://localhost, http://localhost:4200
  - Allowed methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
  - Allowed headers: Authorization, Content-Type, Accept, etc.
  - Max age: 3600 seconds
- CSRF protection: Disabled (stateless API)
- Session management: Stateless

#### Logging Configuration

- Root level: INFO
- Application level: DEBUG
- Security level: DEBUG

### Frontend Configuration

The frontend uses Angular 17 with the following configurations:

#### Build Configuration

- Production build:
  - Initial budget: 500kB (warning), 1MB (error)
  - Component style budget: 4kB (warning), 8kB (error)
  - Output hashing: all
- Development build:
  - Optimization: disabled
  - Source maps: enabled
  - License extraction: disabled

#### Nginx Configuration

- Port: 80
- Root: /usr/share/nginx/html
- Index: index.csr.html
- Gzip compression enabled
- Angular routing support
- API proxy configuration:
  - Proxy pass: http://backend:8080
  - Timeouts: 60s
  - WebSocket support
- Static asset caching:
  - Images, CSS, JS: 1 year
  - HTML: no cache

#### Performance Configuration

- Lazy loading: Enabled
- Server-side rendering: Enabled
- Service worker: Enabled
- Compression: Enabled
- Minification: Enabled (production)
- Source maps: Development only

### Development Ports

- Frontend:
  - Development: 4200
  - Production: 80
- Backend:
  - HTTP: 8080
  - Debug: 5005
- Database:
  - PostgreSQL: 5432

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

### Restarting the Application

To completely restart the application:

1. Stop all containers:

   ```bash
   docker-compose down
   ```

2. Remove all related images:

   ```bash
   docker rmi task-manager-frontend task-manager-backend
   ```

3. Clean up Docker resources:

   ```bash
   docker system prune -f
   ```

4. Rebuild and start:

   ```bash
   docker-compose up --build
   ```

### Important Notes

1. Angular 17+ uses a new build system that generates:
   - Client-side rendered files in the `browser` directory
   - Server-side rendered files in the `server` directory
   - Main entry point is `index.csr.html` for client-side rendering

2. The Nginx configuration must point to the correct build output location:

   ```nginx
   root /usr/share/nginx/html/browser;
   index index.csr.html;
   ```

3. The Dockerfile must copy files from the correct location:

   ```dockerfile
   COPY --from=build /app/dist/frontend /usr/share/nginx/html
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

### Development Workflow

1. Create a new branch from `main`
2. Make your changes
3. Write/update tests
4. Update documentation
5. Create a pull request
6. Code review
7. Merge to `main`

### Code Style

- Backend: Google Java Style Guide
- Frontend: Angular Style Guide
- Use Prettier for formatting
- Follow ESLint rules
- Write meaningful commit messages

## License

This project is licensed under the MIT License.
