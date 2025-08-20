# Docker & Local Development Guide

This repository is fully dockerized for easy review.

## What gets deployed?
- **Express 5** API (Node 20) at port **5000**, base path **/api**
- **PostgreSQL 16** database
- Database is auto-migrated & seeded on container startup

## Quick Start

```bash
# From the project root:
docker compose up --build -d

# View logs
docker compose logs -f app

# Stop
docker compose down
```

After startup, the API is available at:
- `GET http://localhost:5000/api/questions`
- `POST http://localhost:5000/api/submissions`

## Environment

Defaults are provided in `docker-compose.yml`:

```
DB_HOST=db
DB_PORT=5432
DB_NAME=tsn_assessment_dev
DB_USER=postgres
DB_PASS=postgres
PORT=5000
NODE_ENV=production
```

> The entrypoint script rewrites `config/config.json` at runtime using these env vars so Sequelize points to the Docker Postgres service.

## Migrations & Seeders

We use **sequelize-cli**. On container start, the entrypoint runs:

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Run them manually if needed:

```bash
docker compose exec app npx sequelize-cli db:migrate
docker compose exec app npx sequelize-cli db:seed:all
```

Reset database (CAUTION – destructive):

```bash
docker compose exec app npx sequelize-cli db:migrate:undo:all
docker compose exec app npx sequelize-cli db:seed:undo:all
```

## Local development without Docker (optional)

```bash
# Requires Postgres running locally and .env set (if used)
npm install
node app.js
```

## Health Checklist

- [x] App builds in Node 20 (alpine)
- [x] Port 5000 exposed
- [x] Sequelize configured for Postgres in Docker
- [x] Auto migrations and seeders
- [x] Clean shutdown via PID 1 (entrypoint `exec`)
```