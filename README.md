# Fullstack Todo App

A simple todo application with a React frontend, Express backend, and SQLite database — all Dockerized.

## Stack

- **Frontend:** React 19 + Vite, served via nginx
- **Backend:** Express 4 + better-sqlite3
- **Database:** SQLite (persisted via Docker volume)
- **Containerization:** Docker multi-stage builds + docker-compose

## Quick Start

```bash
docker compose up -d
```

- Frontend: http://localhost:8080
- API: http://localhost:4000/api/todos

## API Endpoints

| Method | Endpoint           | Description     |
|--------|--------------------|-----------------|
| GET    | `/api/todos`       | List all todos  |
| POST   | `/api/todos`       | Create a todo   |
| PATCH  | `/api/todos/:id`   | Toggle complete |
| DELETE | `/api/todos/:id`   | Delete a todo   |

## CI/CD

On every push to `main`, GitHub Actions builds both images and pushes them to DockerHub. Requires repo secrets:

- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`

## Project Structure

```
├── backend/            # Express API server
│   ├── Dockerfile
│   └── src/
├── frontend/           # React SPA
│   ├── Dockerfile
│   ├── nginx.conf      # Proxies /api to backend
│   └── src/
├── docker-compose.yml
└── .github/workflows/  # CI/CD pipeline
```
