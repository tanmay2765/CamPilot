from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.dependencies import get_db

from app.services.channel_service import (
    simulate_send
)

from database.models.campaign import Campaign
from database.models.customer import Customer
from database.models.delivery_event import (
    DeliveryEvent
)

router = APIRouter()


@router.post(
    "/campaigns/{campaign_id}/execute"
)
def execute_campaign(
    campaign_id: int,
    db: Session = Depends(get_db)
):

    campaign = (
        db.query(Campaign)
        .filter(
            Campaign.id == campaign_id
        )
        .first()
    )

    if not campaign:
        raise HTTPException(
            status_code=404,
            detail="Campaign not found"
        )

    customers = (
        db.query(Customer)
        .filter(
            Customer.segment ==
            campaign.segment_name
        )
        .all()
    )

    events_created = 0

    for customer in customers:

        event_status = simulate_send(
            campaign.channel
        )

        event = DeliveryEvent(
            campaign_id=campaign.id,
            customer_id=customer.id,
            channel=campaign.channel,
            status=event_status
        )

        db.add(event)

        events_created += 1

    campaign.status = "completed"

    db.commit()

    return {
        "campaign_id": campaign.id,
        "audience_size": len(customers),
        "events_created": events_created,
        "status": campaign.status
    }