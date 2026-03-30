# Project-3: Modern E-Commerce Platform

This is a full-stack e-commerce prototype featuring:
- **Next.js Frontend**: Modern UI with Tailwind CSS.
- **Express API**: Node.js backend with Prisma ORM and JWT Authentication.
- **BullMQ Worker**: Background processing for order fulfillment.
- **PostgreSQL**: Relational database for persistent storage.
- **Redis**: Message broker for the background worker.

## Getting Started

### Prerequisites
- Docker and Docker Compose

### Running the application
1. Navigate to the project directory:
   ```bash
   cd project-3
   ```
2. Start the services:
   ```bash
   docker-compose up --build
   ```
3. Seed the database (once the API is up):
   ```bash
   curl -X POST http://localhost:3001/api/seed
   ```
4. Access the frontend at [http://localhost:3000](http://localhost:3000).

## Architecture
The application follows a microservices-lite architecture:
- `frontend/`: Next.js application.
- `api/`: Express.js REST API.
- `worker/`: Background worker process.
- `db/`: PostgreSQL database (containerized).
- `redis/`: Redis broker (containerized).
