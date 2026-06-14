from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from datetime import datetime, timedelta
from database.connection import Base


class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone = Column(String)
    city = Column(String)
    segment = Column(String)
    orders = relationship(
        "Order",
        back_populates="customer"
    )