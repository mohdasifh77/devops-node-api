# 🚀 DevOps Node.js REST API

A production-ready Node.js REST API with Docker containerization, automated CI/CD using GitHub Actions, health checks, and a live dashboard.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![CI/CD](https://img.shields.io/badge/CI/CD-GitHub_Actions-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📦 Tech Stack

| Tool | Purpose |
|------|---------|
| **Node.js + Express** | REST API server |
| **Docker** | Containerization |
| **Docker Compose** | Multi-container orchestration |
| **GitHub Actions** | CI/CD Pipeline |
| **Jest + Supertest** | Unit & Integration Tests |
| **Helmet + Rate Limiting** | Security middleware |

---

## 🗂️ Project Structure

```
devops-node-api/
├── src/
│   ├── server.js              # Express app entry point
│   └── routes/
│       ├── health.js          # Health check endpoints
│       ├── tasks.js           # CRUD task endpoints
│       └── system.js          # System metrics endpoint
├── tests/
│   └── api.test.js            # Jest integration tests
├── public/
│   └── index.html             # Live dashboard UI
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI/CD
├── Dockerfile                 # Multi-stage Docker build
├── docker-compose.yml         # Docker Compose config
├── .env.example               # Environment variable template
└── package.json
```

---

## 🚀 Quick Start

### Option 1: Run Locally with Node.js

```bash
# 1. Install dependencies
npm install

# 2. Copy env file
cp .env.example .env

# 3. Start development server
npm run dev

# Visit: http://localhost:3000
```

### Option 2: Run with Docker

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Dashboard UI |
| GET | `/api/health` | Health status + uptime |
| GET | `/api/health/live` | Kubernetes liveness probe |
| GET | `/api/health/ready` | Kubernetes readiness probe |
| GET | `/api/system` | System metrics (CPU, memory) |
| GET | `/api/tasks` | List all tasks |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## 🧪 Running Tests

```bash
npm test
```

---

## 🐳 Docker Commands

```bash
# Build image
docker build -t devops-node-api .

# Run container
docker run -p 3000:3000 devops-node-api

# Using Docker Compose
docker-compose up -d       # Start
docker-compose down        # Stop
docker-compose logs -f     # View logs
```

---

## ⚙️ CI/CD Pipeline

On every push to `main` or `develop`, GitHub Actions will:

1. ✅ Run tests on Node.js 18.x and 20.x
2. 🐳 Build Docker image
3. 🔒 Run security audit

---

## 📊 Dashboard

Open `http://localhost:3000` to see the live dashboard with:
- Real-time health status
- System memory and CPU stats
- Interactive API endpoint tester
- Live task manager (Create, Read, Delete)

---

## 📄 License

MIT — free to use and modify.
