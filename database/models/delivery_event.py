from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey
)

from sqlalchemy.sql import func

from database.connection import Base


class DeliveryEvent(Base):

    __tablename__ = "delivery_events"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    campaign_id = Column(
        Integer,
        ForeignKey("campaigns.id")
    )

    customer_id = Column(
        Integer,
        ForeignKey("customers.id")
    )

    channel = Column(String)

    status = Column(String)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )