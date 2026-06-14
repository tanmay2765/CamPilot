from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database.connection import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(
        Integer,
        ForeignKey("customers.id"),
        nullable=False
    )

    amount = Column(Float, nullable=False)

    status = Column(String, default="completed")

    created_at = Column(
    DateTime(timezone=True),
    server_default=func.now()
)

    customer = relationship(
        "Customer",
        back_populates="orders"
    )