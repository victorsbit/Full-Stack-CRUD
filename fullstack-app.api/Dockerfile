# Stage 1: app building
FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: production image
FROM node:alpine3.11 AS production

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

RUN npm install --only=production

EXPOSE 3001

CMD ["npm", "start"]