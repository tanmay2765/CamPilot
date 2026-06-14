from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.order import OrderCreate
from app.dependencies import get_db

from database.models.order import Order

router = APIRouter()


@router.post("/orders")
def create_order(
    order: OrderCreate,
    db: Session = Depends(get_db)
):

    new_order = Order(
        customer_id=order.customer_id,
        amount=order.amount,
        status=order.status
    )

    db.add(new_order)

    db.commit()

    db.refresh(new_order)

    return {
        "message": "Order created successfully",
        "order_id": new_order.id
    }

@router.get("/customers/{customer_id}/orders")
def get_customer_orders(
    customer_id: int,
    db: Session = Depends(get_db)
):

    orders = db.query(Order).filter(
        Order.customer_id == customer_id
    ).all()

    if not orders:
        raise HTTPException(
            status_code=404,
            detail="No orders found"
        )

    return orders