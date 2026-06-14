from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from app.dependencies import get_db

from database.models.customer import Customer
from database.models.order import Order

router = APIRouter()


@router.get("/customers/{customer_id}/metrics")
def customer_metrics(
    customer_id: int,
    db: Session = Depends(get_db)
):

    customer = (
        db.query(Customer)
        .filter(Customer.id == customer_id)
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    orders = (
        db.query(Order)
        .filter(Order.customer_id == customer_id)
        .all()
    )

    total_orders = len(orders)

    total_spend = sum(
        order.amount
        for order in orders
    )

    average_order_value = (
        total_spend / total_orders
        if total_orders > 0
        else 0
    )

    latest_order = max(
        orders,
        key=lambda order: order.created_at
    )

    days_since_last_order = (
        datetime.now(
            latest_order.created_at.tzinfo
        )
        - latest_order.created_at
    ).days

    return {
        "customer_id": customer.id,
        "customer_name": customer.name,
        "segment": customer.segment,
        "total_orders": total_orders,
        "total_spend": round(total_spend, 2),
        "average_order_value": round(
            average_order_value,
            2
        ),
        "days_since_last_order": days_since_last_order
    }