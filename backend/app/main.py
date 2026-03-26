from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import redis
from .models import init_db

app = FastAPI(title="Zapty API")

@app.on_event("startup")
async def startup_event():
    await init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Redis connection
redis_url = os.getenv("REDIS_URL", "redis://redis:6379/0")
r = redis.from_url(redis_url)

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "redis": r.ping()}

@app.get("/api/products")
def get_products():
    return [
        {"id": 1, "name": "Zapty Pro Watch", "price": 199.99, "color": "#2563eb"},
        {"id": 2, "name": "Zapty Audio X", "price": 299.99, "color": "#7c3aed"},
        {"id": 3, "name": "Zapty Lite Case", "price": 29.99, "color": "#db2777"},
    ]
