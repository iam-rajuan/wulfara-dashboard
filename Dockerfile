FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

ARG VITE_BACKEND_URL=
ARG VITE_WEBSITE_URL=https://wulfara.space
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_WEBSITE_URL=$VITE_WEBSITE_URL

COPY . .
RUN npm run build

FROM alpine:3.22 AS runtime

WORKDIR /app
COPY --from=builder /app/dist /opt/dashboard-dist
