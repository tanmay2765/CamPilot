import sys
import os

sys.path.append(
    os.path.dirname(
        os.path.dirname(
            os.path.abspath(__file__)
        )
    )
)

import random

from faker import Faker
from datetime import datetime, timedelta

from database.connection import SessionLocal
from database.models.customer import Customer
from database.models.order import Order
from database.models.campaign import Campaign
from database.models.delivery_event import DeliveryEvent


fake = Faker()
db = SessionLocal()
db.query(DeliveryEvent).delete()
db.query(Order).delete()
db.query(Campaign).delete()
db.query(Customer).delete()

db.commit()
cities = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Pune",
    "Jaipur",
    "Chandigarh"
]

def random_date_between(min_days, max_days):
    days_ago = random.randint(min_days, max_days)

    return datetime.now() - timedelta(days=days_ago)

def create_high_value_customer():
    
    customer = Customer(
        name=fake.name(),
        email=fake.unique.email(),
        phone=fake.phone_number(),
        city=random.choice(cities),
        segment="High Value"
    )

    db.add(customer)
    db.commit()
    db.refresh(customer)

    num_orders = random.randint(10, 20)

    for _ in range(num_orders):

        order = Order(
            customer_id=customer.id,
            amount=random.randint(3000, 8000),
            status="completed",
            created_at=random_date_between(1, 30)
        )

        db.add(order)

    db.commit()


def create_medium_value_customer():

    customer = Customer(
        name=fake.name(),
        email=fake.unique.email(),
        phone=fake.phone_number(),
        city=random.choice(cities),
        segment="Medium Value"
    )

    db.add(customer)
    db.commit()
    db.refresh(customer)

    num_orders = random.randint(5, 10)

    for _ in range(num_orders):

        order = Order(
            customer_id=customer.id,
            amount=random.randint(1000, 4000),
            status="completed",
            created_at=random_date_between(1, 45)
        )

        db.add(order)

    db.commit()


def create_low_value_customer():

    customer = Customer(
        name=fake.name(),
        email=fake.unique.email(),
        phone=fake.phone_number(),
        city=random.choice(cities),
        segment="Low Value"
    )

    db.add(customer)
    db.commit()
    db.refresh(customer)

    num_orders = random.randint(1, 3)

    for _ in range(num_orders):

        order = Order(
            customer_id=customer.id,
            amount=random.randint(500, 1500),
            status="completed",
            created_at=random_date_between(1, 30)
        )

        db.add(order)

    db.commit()


def create_dormant_customer():

    customer = Customer(
        name=fake.name(),
        email=fake.unique.email(),
        phone=fake.phone_number(),
        city=random.choice(cities),
        segment="Dormant"
    )

    db.add(customer)
    db.commit()
    db.refresh(customer)

    num_orders = random.randint(5, 15)

    for _ in range(num_orders):

        order = Order(
            customer_id=customer.id,
            amount=random.randint(1500, 5000),
            status="completed",
            created_at=random_date_between(60, 180)
        )

        db.add(order)

    db.commit()

for _ in range(20):
    create_high_value_customer()

for _ in range(30):
    create_medium_value_customer()

for _ in range(30):
    create_low_value_customer()

for _ in range(20):
    create_dormant_customer()

print("Seed data generated successfully")