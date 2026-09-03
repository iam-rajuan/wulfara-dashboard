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

FROM nginx:alpine AS runtime

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
