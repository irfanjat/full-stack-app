FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM node:22-alpine
RUN apk add --no-cache dumb-init
WORKDIR /app
RUN mkdir data
COPY --from=builder /app/node_modules ./node_modules
COPY src ./src
EXPOSE 4000
CMD ["dumb-init", "node", "src/index.js"]
