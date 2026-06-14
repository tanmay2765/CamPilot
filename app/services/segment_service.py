from sqlalchemy.orm import Session
from sqlalchemy import func

from database.models.customer import Customer
from database.models.order import Order


def get_segment_stats(
    db: Session,
    segment_name: str
):

    audience_size = (
        db.query(Customer)
        .filter(
            Customer.segment == segment_name
        )
        .count()
    )

    total_spend = (
        db.query(
            func.sum(Order.amount)
        )
        .join(
            Customer,
            Customer.id == Order.customer_id
        )
        .filter(
            Customer.segment == segment_name
        )
        .scalar()
    )

    average_spend = (
        total_spend / audience_size
        if audience_size > 0
        else 0
    )

    total_orders = (
        db.query(Order)
        .join(
            Customer,
            Customer.id == Order.customer_id
        )
        .filter(
            Customer.segment == segment_name
        )
        .count()
    )

    average_orders = (
        total_orders / audience_size
        if audience_size > 0
        else 0
    )

    return {
        "segment_name": segment_name,
        "audience_size": audience_size,
        "average_spend": round(
            average_spend,
            2
        ),
        "average_orders": round(
            average_orders,
            2
        )
    }

def get_all_segment_stats(db):

    segments = [
        "High Value",
        "Medium Value",
        "Low Value",
        "Dormant"
    ]

    result = []

    for segment in segments:

        stats = get_segment_stats(
            db,
            segment
        )

        result.append(stats)

    return result