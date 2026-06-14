from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.dependencies import get_db

from database.models.customer import Customer
from database.models.order import Order
from database.models.campaign import Campaign
from database.models.delivery_event import DeliveryEvent

router = APIRouter()


@router.get("/dashboard/summary")
def dashboard_summary(
    db: Session = Depends(get_db)
):

    total_customers = (
        db.query(Customer)
        .count()
    )

    total_orders = (
        db.query(Order)
        .count()
    )

    total_campaigns = (
        db.query(Campaign)
        .count()
    )

    total_delivery_events = (
        db.query(DeliveryEvent)
        .count()
    )

    high_value = (
        db.query(Customer)
        .filter(
            Customer.segment == "High Value"
        )
        .count()
    )

    medium_value = (
        db.query(Customer)
        .filter(
            Customer.segment == "Medium Value"
        )
        .count()
    )

    low_value = (
        db.query(Customer)
        .filter(
            Customer.segment == "Low Value"
        )
        .count()
    )

    dormant = (
        db.query(Customer)
        .filter(
            Customer.segment == "Dormant"
        )
        .count()
    )

    total_revenue = (
        db.query(func.sum(Order.amount))
        .scalar()
    )

    return {
        "customers": total_customers,
        "orders": total_orders,
        "campaigns": total_campaigns,
        "delivery_events": total_delivery_events,
        "total_revenue": round(total_revenue or 0,2),
        "segments": {
            "High Value": high_value,
            "Medium Value": medium_value,
            "Low Value": low_value,
            "Dormant": dormant
        }
    }