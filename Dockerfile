# syntax=docker/dockerfile:1.7

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
ARG FRONTEND_INSTALL_COMMAND="npm ci"
ARG FRONTEND_BUILD_COMMAND="npm run build"
ARG FRONTEND_OUTPUT_DIR=dist

RUN apt-get update && apt-get install -y --no-install-recommends \
    nodejs=${NODEJS_VERSION} \
    npm=${NPM_VERSION} \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY ${FRONTEND_DIR}/package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    sh -c "${FRONTEND_INSTALL_COMMAND}"

COPY ${FRONTEND_DIR}/ ./
RUN sh -c "${FRONTEND_BUILD_COMMAND}" \
    && mkdir -p /frontend-dist \
    && cp -a "${FRONTEND_OUTPUT_DIR}/." /frontend-dist/


# The runnable target used by docker-compose.dev.yml.
FROM frontend-builder AS frontend-development

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]


# =========================================
# NGINX
# =========================================

FROM ubuntu:${UBUNTU_VERSION} AS nginx-runner

ARG NGINX_VERSION

RUN apt-get update && apt-get install -y --no-install-recommends \
    nginx=${NGINX_VERSION} \
    && rm -rf /var/lib/apt/lists/*

COPY nginx.conf /etc/nginx/nginx.conf
# nginx.conf serves files from /usr/share/nginx/html.
COPY --from=frontend-builder /frontend-dist/ /usr/share/nginx/html/

EXPOSE 8080

ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]


# =========================================
# DJANGO BACKEND
# =========================================

FROM ubuntu:${UBUNTU_VERSION} AS django-builder

ARG BACKEND_DIR
ARG BACKEND_REQUIREMENTS_FILE=requirements.txt
ARG BACKEND_INSTALL_COMMAND="python -m pip install -r /tmp/requirements.txt"

# Prevent Python from writing .pyc files to disk.
ENV PYTHONDONTWRITEBYTECODE=1

# Prevent Python from buffering stdout/stderr so logs appear immediately.
ENV PYTHONUNBUFFERED=1

ENV PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PATH="/opt/venv/bin:$PATH"

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-venv \
    && rm -rf /var/lib/apt/lists/* \
    && python3 -m venv /opt/venv

WORKDIR /app

# This project uses requirements.txt; the previous uv bind mounts referenced
# pyproject.toml and uv.lock files that are not present in the repository.
COPY ${BACKEND_DIR}/${BACKEND_REQUIREMENTS_FILE} /tmp/requirements.txt
RUN --mount=type=cache,target=/root/.cache/pip \
    sh -c "${BACKEND_INSTALL_COMMAND}"


FROM django-builder AS django-development

ARG BACKEND_DIR

COPY ${BACKEND_DIR}/ ./

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
