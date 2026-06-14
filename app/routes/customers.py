from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.customer import CustomerCreate
from app.dependencies import get_db

from database.models.customer import Customer

router = APIRouter()


@router.post("/customers")
def create_customer(
    customer: CustomerCreate,
    db: Session = Depends(get_db)
):

    new_customer = Customer(
        name=customer.name,
        email=customer.email,
        phone=customer.phone,
        city=customer.city
    )

    db.add(new_customer)

    db.commit()

    db.refresh(new_customer)

    return {
        "message": "Customer created successfully",
        "customer_id": new_customer.id
    }