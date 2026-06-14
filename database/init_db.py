from database.connection import Base, engine
from database.models.customer import Customer
from database.models.order import Order
from database.models.campaign import Campaign
from database.models.delivery_event import DeliveryEvent

Base.metadata.create_all(bind=engine)