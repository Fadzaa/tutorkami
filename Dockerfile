# ---- build stage -------------------------------------------------------
# Vite inlines VITE_* at BUILD time, so they must arrive as build args,
# not as runtime container env.
FROM node:22-alpine AS build
WORKDIR /app

ARG VITE_API_BASE_URL="https://api-tutorkami.alfadzaa.tech/api/v1/"
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ARG VITE_SECRET_KEY=""
ENV VITE_SECRET_KEY=$VITE_SECRET_KEY
COPY package*.json ./
RUN npm ci --no-audit --no-fund || npm install --no-audit --no-fund

COPY . .
RUN npm run build

# ---- serve stage -------------------------------------------------------
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1
