# Zapty - Modern E-commerce Platform

Zapty is a high-performance e-commerce prototype built with:
- **Frontend:** React + Vite + TypeScript + Framer Motion
- **Backend:** FastAPI (Python 3.14)
- **Database:** PostgreSQL (Primary + Replica)
- **Caching:** Redis
- **Ingress:** Traefik + Nginx

## Getting Started

1.  **Start the services:**
    ```bash
    docker-compose up --build
    ```

2.  **Access the application:**
    - Frontend: `http://localhost` (via Traefik) or `http://zapty.local` (if hosts file is configured)
    - Backend API: `http://localhost/api`
    - Traefik Dashboard: `http://localhost:8080`

## Architecture

- **User** -> **Traefik** (80) -> **Frontend** / **Backend**
- **Backend** -> **PostgreSQL** (Primary)
- **Backend** -> **Redis** (Caching/Session)
