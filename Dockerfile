# Build the static UI separately; Node and frontend sources are not in the runtime image.
FROM node:22-bookworm-slim AS frontend
WORKDIR /build
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY frontend/index.html frontend/tsconfig.json frontend/vite.config.js ./
COPY frontend/src/ ./src/
COPY frontend/public/ ./public/
RUN npm run build

FROM python:3.12-slim-bookworm AS runtime
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    HOME=/home/sketchless SKETCHLESS_DATA_DIR=/app/data \
    OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 \
    VTK_SMP_MAX_THREADS=1 PORT=8000
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 libegl1 libglib2.0-0 libxrender1 libxext6 libsm6 libgomp1 fontconfig \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
RUN groupadd --gid 10001 sketchless \
    && useradd --uid 10001 --gid 10001 --create-home sketchless \
    && mkdir -p /app/data && chown 10001:10001 /app/data
COPY backend/ ./backend/
COPY ml/__init__.py ml/model.py ml/classifier.joblib ml/config.json ml/dataset.json ./ml/
COPY deploy/start.py ./deploy/start.py
COPY --from=frontend /build/dist/ ./frontend/dist/
USER 10001:10001
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s --start-period=90s --retries=3 \
    CMD python -c "import os,urllib.request; urllib.request.urlopen('http://127.0.0.1:'+os.getenv('PORT','8000')+'/api/config',timeout=4).close()"
CMD ["python", "deploy/start.py"]
