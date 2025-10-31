# Multi-stage Dockerfile for PestLord Solutions
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Copy .env file for build-time environment variables
# Note: .env must be available in the build context (ensure it's not in .dockerignore)
COPY .env ./.env

# Build the application
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 3012

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
