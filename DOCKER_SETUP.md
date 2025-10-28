# 🐳 Docker Setup for PestLord Solutions

This guide will help you build and run the PestLord Solutions application using Docker.

## 📋 Prerequisites

- Docker installed (version 20.10 or higher)
- Docker Compose installed (version 2.0 or higher)
- At least 2GB free disk space

## 🚀 Quick Start

### Build and Run with Docker Compose

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

The application will be available at: **http://localhost:3012**

---

## 🔧 Manual Docker Build

If you prefer to build manually without docker-compose:

```bash
# Build the Docker image
docker build -t pestlord-solutions:latest .

# Run the container
docker run -d \
  --name pestlord-solutions \
  -p 3012:3012 \
  --restart unless-stopped \
  pestlord-solutions:latest
```

Access the application at: **http://localhost:3012**

---

## 🛠️ Development Commands

```bash
# View running containers
docker ps

# View container logs
docker logs pestlord-solutions
docker logs -f pestlord-solutions  # Follow logs

# Stop and remove container
docker-compose down

# Rebuild after code changes
docker-compose up -d --build

# Remove all containers and images
docker-compose down -v --rmi all
```

---

## 🌍 Environment Variables

Create a `.env` file (for local development, not needed in production):

```env
VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook
VITE_N8N_QUOTE_WEBHOOK_URL=https://your-n8n-instance.com/quote-webhook
VITE_N8N_CONTACT_WEBHOOK_URL=https://your-n8n-instance.com/contact-webhook
```

**Note:** Since this is a static React app, environment variables need to be set at build time (before `npm run build`), not at runtime. For production, configure these in your CI/CD pipeline or build process.

---

## 📦 Architecture

### Multi-Stage Build

1. **Builder Stage**: Builds the React application with Vite
2. **Production Stage**: Serves the built static files using Nginx

### Container Details

- **Base Image**: `node:20-alpine` (build), `nginx:alpine` (production)
- **Port**: 3012
- **HTTP Server**: Nginx
- **Restart Policy**: unless-stopped

---

## 🔍 Troubleshooting

### Container won't start

```bash
# Check container status
docker ps -a

# View error logs
docker logs pestlord-solutions

# Check if port 3012 is already in use
lsof -i :3012
```

### Port already in use

Change the port in `docker-compose.yml`:

```yaml
ports:
  - "3013:3012"  # Change first number to available port
```

### Rebuild after dependencies change

```bash
# Remove old image and rebuild
docker-compose down
docker-compose up -d --build --force-recreate
```

### Clear Docker cache

```bash
# Remove all unused images
docker image prune -a

# Remove all unused containers
docker container prune

# Full cleanup
docker system prune -a
```

---

## 🎯 Production Deployment

### 1. Build for Production

```bash
# Build optimized production image
docker build -t pestlord-solutions:production .

# Tag for registry
docker tag pestlord-solutions:production your-registry/pestlord-solutions:v1.0.0
```

### 2. Push to Registry (Optional)

```bash
# Login to registry
docker login your-registry.com

# Push image
docker push your-registry/pestlord-solutions:v1.0.0
```

### 3. Deploy on Server

```bash
# Pull and run on production server
docker pull your-registry/pestlord-solutions:v1.0.0
docker run -d -p 3012:3012 --name pestlord-solutions your-registry/pestlord-solutions:v1.0.0
```

---

## 📊 Health Check

The container includes a health check that monitors the application status:

```bash
# Check health status
docker inspect --format='{{.State.Health.Status}}' pestlord-solutions
```

Expected output: `healthy`

---

## 🔒 Security Notes

1. The Nginx configuration includes security headers
2. Static files are served efficiently with gzip compression
3. Client-side routing is properly handled for React SPA
4. Cache headers are set appropriately for static assets

---

## 📝 File Structure

```
.
├── Dockerfile                 # Multi-stage build configuration
├── docker-compose.yml        # Docker Compose setup
├── .dockerignore             # Files to exclude from build
├── nginx.conf                # Nginx server configuration
└── dist/                     # Build output (created during build)
```

---

## 🆘 Need Help?

- Check logs: `docker-compose logs -f`
- Container status: `docker ps`
- Restart container: `docker-compose restart`
- Full rebuild: `docker-compose up -d --build --force-recreate`

---

## ✅ Success Indicators

- Container running: `docker ps` shows `pestlord-solutions`
- Application accessible at http://localhost:3012
- Health check passes (use `docker inspect` command above)
- No errors in logs: `docker logs pestlord-solutions`
