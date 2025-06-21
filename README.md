
# 🐳 Full Stack App with Load Balancing (Node.js + Flask + React + Nginx)

This is a full-stack web app that demonstrates:

* ✅ React frontend
* ✅ Node.js and Flask APIs as backend services
* ✅ Nginx for load balancing and failover between Node.js and Flask
* ✅ Docker Compose for easy setup

---

## 📁 Project Structure

```
project-root/
├── docker-compose.yml
├── nginx.conf
├── logs/
│   ├── requests.log
│   ├── node_request.log
│   └── flask_request.log
├── node-server/
│   ├── Dockerfile
│   ├── index.js
│   └── package.json
├── flask-server/
│   ├── Dockerfile
│   ├── app.py
│   └── requirements.txt
└── react-app/
    ├── Dockerfile
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js
        └── index.js
```

---

## 🚀 How to Run the Project

### 🔧 1. Clone the Repository

```bash
https://github.com/way-back-home/load-balancer.git
cd load-balancer
```

### 📦 2. Make Sure You Have

* Docker installed → [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
* Docker Compose installed → [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

---

### ⚙️ 3. Build and Start Everything

```bash
docker-compose up --build
```

This will:

* Build and run:

  * Node.js backend (port 3000)
  * Flask backend (port 5000)
  * React frontend (compiled into static files)
  * Nginx (port 80, exposed as 8080 locally)

---

### 🌐 4. Open the App in Your Browser

Open:

```
http://localhost:8080
```

You should see the React frontend, and a message like:

```
Hello from Node.js! (from Node.js server)
```

Refresh the page and it may say:

```
Hello from Flask! (from Flask server)
```

> This shows that Nginx is load balancing between the two backends.

---

## 🔍 Project Details

### 📦 Node.js Backend

* Located in `node-server/`
* Uses Express to serve `/api/hello`
* Returns JSON: `{ source: "Node.js server", message: "Hello from Node.js!" }`

### 🐍 Flask Backend

* Located in `flask-server/`
* Serves `/api/hello`
* Returns JSON: `{ source: "Flask server", message: "Hello from Flask!" }`

### ⚛️ React Frontend

* Located in `react-app/`
* On load, it fetches `/api/hello`
* Uses `fetch()` and displays the JSON response

---

## 🔄 Load Balancing Logic

Nginx acts as a reverse proxy:

* Load balances between the Node.js and Flask servers
* If one backend goes down, Nginx automatically reroutes to the working one

Nginx config (`nginx.conf`):

```nginx
upstream backend_servers {
  server node:3000 max_fails=3 fail_timeout=30s;
  server flask:5000 max_fails=3 fail_timeout=30s;
}

server {
  listen 80;

  location /api/ {
    proxy_pass http://backend_servers;
  }

  location / {
    root /usr/share/nginx/html;
    index index.html;
  }
}
```

---

## 🧹 Cleanup

To stop the app:

```bash
docker-compose down
```

To rebuild from scratch:

```bash
docker-compose down -v
docker-compose up --build
```

---

## ✅ Requirements Recap

* Docker
* Docker Compose
* Basic understanding of React, Node, Flask, and Docker

---

## 📌 Notes

* React is built at runtime and served as static files via Nginx.
* API routes are accessed through `/api/` path, handled by Nginx.
* Session/state should be handled via tokens or shared DB if you scale further.
