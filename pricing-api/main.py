from fastapi import FastAPI

app = FastAPI()


def get_price(price: float, title: str) -> float:
    multiplier = 1.0
    if title == "t-shirt":
        multiplier = 1.05
    elif title == "jumper":
        multiplier = 1.02
    elif title == "jeans":
        multiplier = 1.075
    elif title == "polo shirt":
        multiplier = 1.06

    updated_price = price * multiplier
    return min(updated_price, 100.0)


@app.get("/api")
async def calculate_price(price: float, title: str = "") -> float:
    return get_price(price, title)
