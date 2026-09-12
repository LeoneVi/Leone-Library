# Sources:
# - https://docs.docker.com/guides/vuejs/
# - https://docs.docker.com/guides/django/
# - https://docs.docker.com/build/building/best-practices/

ARG UBUNTU_VERSION=26.04
ARG NODEJS_VERSION=22.22.1+dfsg+~cs22.19.15-1ubuntu1
ARG NPM_VERSION=9.2.0~ds3-1
ARG NGINX_VERSION=1.28.3-2ubuntu1.10

ARG FRONTEND_DIR=frontend
ARG BACKEND_DIR=backend


# =========================================
# FRONTEND
# =========================================

FROM ubuntu:${UBUNTU_VERSION} AS frontend-builder

ARG NODEJS_VERSION
ARG NPM_VERSION
ARG FRONTEND_DIR

# Install necessary packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    nodejs=${NODEJS_VERSION} \
    npm=${NPM_VERSION} \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy package-related files first to leverage Docker's caching mechanism
COPY ${FRONTEND_DIR}/package.json ${FRONTEND_DIR}/package-lock.json* ./

# Install project dependencies using npm ci (ensures a clean, reproducible install)
RUN --mount=type=cache,target=/root/.npm npm ci

# Copy the rest of the application source code into the container
COPY ${FRONTEND_DIR}/ .

# Build the Vue.js application
RUN npm run build


# =========================================
# NGINX
# =========================================

FROM ubuntu:${UBUNTU_VERSION} AS nginx-runner

ARG NGINX_VERSION

# Install necessary packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    nginx=${NGINX_VERSION} \
    && rm -rf /var/lib/apt/lists/*

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the static build output from the frontend build stage
COPY --from=frontend-builder /app/dist /var/www/html

# Expose port 8080 to allow HTTP traffic
EXPOSE 8080

# Start Nginx directly with custom config
ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]


# =========================================
# DJANGO BACKEND
# =========================================

# Build stage: install Python and tools needed to install packages.
FROM ubuntu:${UBUNTU_VERSION} AS django-builder

ARG BACKEND_DIR

# Prevent Python from writing .pyc files to disk.
ENV PYTHONDONTWRITEBYTECODE=1

# Prevent Python from buffering stdout/stderr so logs appear immediately.
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-venv \
    && rm -rf /var/lib/apt/lists/*

RUN pip3 install --break-system-packages uv

# Use copy mode since the cache and build filesystem are on different volumes.
ENV UV_LINK_MODE=copy

WORKDIR /app

# Install dependencies into a virtual environment using cache and bind mounts
# so neither uv nor the lock files need to be copied into the image.
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=${BACKEND_DIR}/uv.lock,target=uv.lock \
    --mount=type=bind,source=${BACKEND_DIR}/pyproject.toml,target=pyproject.toml \
    uv sync --frozen --no-install-project


# The development stage inherits the build environment and virtual environment
# from the builder. Django's built-in server reloads when Compose Watch syncs files.
FROM django-builder AS django-development

ARG BACKEND_DIR

ENV PATH="/app/.venv/bin:$PATH"

COPY ${BACKEND_DIR}/ .

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]