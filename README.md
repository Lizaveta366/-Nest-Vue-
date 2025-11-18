# Load Testing Application

A full-stack application for load testing API endpoints, built with NestJS backend and Vue 3 frontend.

## Architecture

- **Backend**: NestJS + TypeORM + PostgreSQL
- **Frontend**: Vue 3 + Vite + Axios
- **Database**: PostgreSQL with Docker
- **Containerization**: Docker Compose

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd load-test-app
   
##  Start the application

docker-compose up --build

## Seed the database with test data

# In a new terminal, run the seed script
cd backend
npm install
npm run seed

# Load Testing Application

NestJS + Vue 3 + PostgreSQL with Docker

## Quick Start with GitPod

[![Open in GitPod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ВАШ_USERNAME/load-test-app)

## Local Development

```bash
docker-compose up --build