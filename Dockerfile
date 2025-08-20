# syntax=docker/dockerfile:1
FROM node:20-alpine AS base
WORKDIR /app

RUN apk add --no-cache bash netcat-openbsd

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm i -g sequelize-cli

RUN chmod +x ./docker-entrypoint.sh

EXPOSE 5000
ENV NODE_ENV=production

ENTRYPOINT ["./docker-entrypoint.sh"]