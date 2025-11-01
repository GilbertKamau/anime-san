# 🎌 Anime Quotes Dashboard

> A full-stack Dockerized web application that displays random anime quotes in a clean React dashboard — complete with backend API integration, Prometheus monitoring, and Grafana visualization.

---

## 📖 Overview

**Anime Quotes Dashboard** is a fun yet technically rich project that fetches quotes from the [AnimeChan API](https://animechan.io) and serves them through a Python (Flask) backend to a React frontend.  
It includes observability tooling using **Prometheus** for metrics collection and **Grafana** for real-time visualization of API performance.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React (JavaScript) |
| **Backend** | Python Flask |
| **Monitoring** | Prometheus + Grafana |
| **Containerization** | Docker & Docker Compose |
| **API Source** | [AnimeChan.io](https://animechan.io) |

---

## 🚀 Features

- 🎨 Beautiful, responsive frontend UI built with React  
- 🧠 Random anime quote generator  
- 🔁 Dynamic fetching and rendering with button interaction  
- 🧩 Backend API written in Flask (with CORS enabled)  
- 📊 Prometheus metrics endpoint (`/metrics`)  
- 📈 Grafana dashboard with:
  - API request counts  
  - Request latency (95th percentile)  
  - Real-time request rates  

---

## 📂 Project Structure

anime-san/
│
├── backend/
│ ├── app.js
│ └── Dockerfile
│
├── frontend/
│ ├── src/
│ │ ├── App.js
│ │ └── components/QuoteCard.js
│ ├── public/
│ └── Dockerfile
│
├── prometheus/
│ └── prometheus.yml
│
├── docker-compose.yml
└── README.md

yaml
Copy code

---

## ⚙️ Installation & Setup

### 🧩 Prerequisites
Make sure you have installed:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

### 🐳 Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/anime-san.git
cd anime-san
🧱 Step 2: Build and Run Containers
bash
Copy code
docker-compose up --build
This will spin up:

🧩 Backend at http://localhost:5000

🎨 Frontend at http://localhost:3000

📊 Prometheus at http://localhost:9090

📈 Grafana at http://localhost:3001

🌐 API Endpoint
GET /api/quotes
Returns a random anime quote.

Example Response:

json
Copy code
{
  "quote": "No matter what, anyone would hate to be weak as they get plundered...",
  "anime": "Baka & Test - Summon the Beasts",
  "character": "Sakamoto Yuuji",
  "source": "animechan.io"
}
🧠 Metrics Endpoint
The backend exposes Prometheus metrics at:

bash
Copy code
/metrics
Example Metrics:

pgsql
Copy code
api_requests_total{method="GET",endpoint="/api/quotes"} 12
api_request_duration_seconds_count 12
📊 Monitoring Setup
Prometheus Configuration (prometheus/prometheus.yml)
yaml
Copy code
global:
  scrape_interval: 5s

scrape_configs:
  - job_name: 'anime-backend'
    metrics_path: /metrics
    static_configs:
      - targets: ['backend:5000']
Grafana Configuration
Open Grafana → http://localhost:3001

Go to Connections → Data Sources → Add Data Source → Prometheus

Set URL to http://prometheus:9090

Save & Test

Create a dashboard and add panels for:

api_requests_total

rate(api_requests_total[1m])

api_request_duration_seconds_count

histogram_quantile(0.95, sum(rate(api_request_duration_seconds_bucket[5m])) by (le))

🧩 Docker Compose Overview
yaml
Copy code
version: '3.9'

services:
  backend:
    build: ./backend
    container_name: anime-backend
    ports:
      - '5000:5000'
    networks:
      - monitoring

  frontend:
    build: ./frontend
    container_name: anime-frontend
    ports:
      - '3000:80'
    depends_on:
      - backend
    networks:
      - monitoring

  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml:ro
    ports:
      - '9090:9090'
    networks:
      - monitoring

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - '3001:3000'
    depends_on:
      - prometheus
    networks:
      - monitoring

networks:
  monitoring:
    driver: bridge
🛠️ Common Commands
Task	Command
Rebuild and restart	docker-compose up --build
Stop containers	docker-compose down
Restart only backend	docker-compose restart backend
View logs	docker-compose logs -f
Enter backend shell	docker exec -it anime-backend sh

🧰 Troubleshooting
1️⃣ Prometheus says connection refused
Check if backend service name in prometheus.yml matches your Docker service name:

yaml
Copy code
targets: ['backend:5000']
2️⃣ Frontend not fetching quotes
Ensure CORS is enabled in Flask:

python
Copy code
from flask_cors import CORS
CORS(app)
3️⃣ Grafana shows “Empty query result”
Make sure the backend has received some requests — Prometheus only scrapes metrics after /api/quotes is called.

💡 Future Improvements
🧾 Add caching layer for quotes

📦 Store quotes in a database

🔐 Add authentication

⚙️ Deploy to cloud (GCP, AWS, or Render)

🌈 Add anime image previews

👨‍💻 Author
Gilbert Kamau
Python & React Developer | GDSC Lead | Postman Student Expert
📍 Kenya
🔗 GitHub

🧾 License
This project is licensed under the MIT License — feel free to use and modify it.

“Even the quietest moments can echo through eternity — especially when coded beautifully.” 💫

