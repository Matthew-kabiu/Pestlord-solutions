FROM node:24-alpine AS development
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

FROM development AS builder
RUN npm run build

FROM node:24-alpine AS production-dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

FROM node:24-alpine AS production
WORKDIR /app
COPY --from=production-dependencies --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node package.json ./
COPY --from=builder --chown=node:node /app/build ./build
COPY --from=builder --chown=node:node /app/dist ./dist
USER node
CMD ["node", "build/server/server.js"]
