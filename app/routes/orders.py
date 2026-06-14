from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.schemas.order import OrderCreate
from app.dependencies import get_db

from database.models.order import Order
from database.models.customer import Customer

router = APIRouter()


@router.get("/orders")
def list_orders(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    query = db.query(Order, Customer.name, Customer.email, Customer.segment).join(
        Customer, Customer.id == Order.customer_id
    ).order_by(Order.created_at.desc())

    total = query.count()
    results = query.offset((page - 1) * limit).limit(limit).all()

    return {
        "orders": [
            {
                "id": order.id,
                "customer_id": order.customer_id,
                "customer_name": name,
                "customer_email": email,
                "customer_segment": segment,
                "amount": order.amount,
                "status": order.status,
                "created_at": str(order.created_at) if order.created_at else None,
            }
            for order, name, email, segment in results
        ],
        "total": total,
        "page": page,
        "pages": (total + limit - 1) // limit
    }


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

    return [
        {
            "id": o.id,
            "customer_id": o.customer_id,
            "amount": o.amount,
            "status": o.status,
            "created_at": str(o.created_at) if o.created_at else None,
        }
        for o in orders
    ]