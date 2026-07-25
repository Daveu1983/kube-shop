import os
from typing import Any, Dict, List
from urllib import parse, request

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

allowed_origin = os.getenv("ALLOWED_ORIGIN", "http://localhost:3001")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[allowed_origin, "http://127.0.0.1:3001", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def build_products() -> List[Dict[str, Any]]:
    return [
        {
            "title": "t-shirt",
            "description": "funky and loud",
            "price": 5.0,
            "quantity": 0,
            "size": "XL",
            "colour": "blue",
        },
        {
            "title": "jumper",
            "description": "plain pattern",
            "price": 10.0,
            "quantity": 0,
            "size": "L",
            "colour": "white",
        },
        {
            "title": "jeans",
            "description": "straight denim",
            "price": 15.0,
            "quantity": 0,
            "size": "32L30W",
            "colour": "red",
        },
        {
            "title": "polo shirt",
            "description": "plain",
            "price": 7.0,
            "quantity": 0,
            "size": "small",
            "colour": "purple",
        },
    ]


def get_prices(products: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    api_url = os.getenv("API_URL") or os.getenv("PRICING_API_URL")
    if not api_url:
        api_url = "http://pricing-api:5000/api" if os.getenv("PYTHONUNBUFFERED") else "http://localhost:5000/api"

    for product in products:
        params = parse.urlencode({"title": product["title"], "price": str(product["price"])})
        target_url = f"{api_url}?{params}"
        try:
            with request.urlopen(target_url, timeout=5) as response:
                body = response.read().decode("utf-8")
                product["price"] = float(body)
        except Exception as exc:  # pragma: no cover - defensive fallback
            print(f"Error for product {product['title']}: {exc}")

    return products


@app.get("/api")
async def list_products() -> List[Dict[str, Any]]:
    products = build_products()
    return get_prices(products)
