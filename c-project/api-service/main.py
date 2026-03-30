from fastapi import FastAPI
import os

app = FastAPI(title="Order API")


@app.get("/")
def read_root():
    return {"message": "Hello from the Arch Linux Container!"}


@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}


@app.get("/health")
def health():
    return {"status": "wokay", "service": "api-service"}


@app.get("/metrics")
def metrics():
    return {"requests_total": 42, "errors_total": 3}  # You can expand this later


@app.get("/orders")
def get_orders():
    return {"orders": []}
