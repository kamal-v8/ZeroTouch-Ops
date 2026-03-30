from fastapi import FastAPI
import os
import time
from rq import Queue
from redis import Redis

app = FastAPI(title="Worker Service")

# Connect to Redis
redis_conn = Redis(host=os.getenv("REDIS_HOST", "redis"), port=6379)
queue = Queue(connection=redis_conn)


@app.get("/health")
def health():
    return {"status": "healthy", "service": "worker-service"}


@app.get("/metrics")
def metrics():
    return {
        "queued_jobs": queue.count,
        "failed_jobs": queue.failed_job_registry.count,
        "started_jobs": queue.started_job_registry.count,
    }


# Example job function
def process_order(order_id):
    print(f"Processing order {order_id}...")
    time.sleep(3)  # Simulate work
    print(f"Order {order_id} processed!")
    return f"Order {order_id} completed"


@app.post("/enqueue-order")
def enqueue_order(order_id: int):
    job = queue.enqueue(process_order, order_id)
    return {"job_id": job.id, "status": "queued"}
