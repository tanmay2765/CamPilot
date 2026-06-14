from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies import get_db

from database.models.customer import Customer
from database.models.order import Order
from database.models.campaign import Campaign
from database.models.delivery_event import DeliveryEvent

router = APIRouter()

@router.get("/customers/{customer_id}/summary")
def customer_summary(
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

    segment = customer.segment

    return {
    "customer_id": customer.id,
    "customer_name": customer.name,
    "total_orders": total_orders,
    "total_spend": total_spend,
    "average_order_value": round(
        average_order_value,
        2
    ),
    "segment": customer.segment
}


@router.get("/campaigns/{campaign_id}/analytics")
def campaign_analytics(
    campaign_id: int,
    db: Session = Depends(get_db)
):

    campaign = (
        db.query(Campaign)
        .filter(Campaign.id == campaign_id)
        .first()
    )

    if not campaign:
        raise HTTPException(
            status_code=404,
            detail="Campaign not found"
        )

    events = (
        db.query(DeliveryEvent)
        .filter(DeliveryEvent.campaign_id == campaign_id)
        .all()
    )

    total_sent = len(events)
    delivered = sum(1 for e in events if e.status == "delivered")
    opened = sum(1 for e in events if e.status == "opened")
    clicked = sum(1 for e in events if e.status == "clicked")

    open_count = opened + clicked
    click_count = clicked

    open_rate = round((open_count / total_sent * 100), 2) if total_sent > 0 else 0.0
    click_rate = round((click_count / total_sent * 100), 2) if total_sent > 0 else 0.0

    return {
        "campaign_id": campaign.id,
        "campaign_name": campaign.name,
        "segment_name": campaign.segment_name,
        "channel": campaign.channel,
        "status": campaign.status,
        "total_sent": total_sent,
        "delivered": delivered,
        "opened": opened,
        "clicked": clicked,
        "open_rate_percentage": open_rate,
        "click_rate_percentage": click_rate
    }