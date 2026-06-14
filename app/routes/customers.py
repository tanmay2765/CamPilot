from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.schemas.customer import CustomerCreate
from app.dependencies import get_db

from database.models.customer import Customer

router = APIRouter()


@router.get("/customers")
def list_customers(
    search: Optional[str] = Query(None, description="Search by name or email"),
    segment: Optional[str] = Query(None, description="Filter by segment"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    query = db.query(Customer)

    if search:
        query = query.filter(
            (Customer.name.ilike(f"%{search}%")) |
            (Customer.email.ilike(f"%{search}%"))
        )

    if segment and segment != "All":
        query = query.filter(Customer.segment == segment)

    total = query.count()
    customers = query.offset((page - 1) * limit).limit(limit).all()

    return {
        "customers": [
            {
                "id": c.id,
                "name": c.name,
                "email": c.email,
                "phone": c.phone,
                "city": c.city,
                "segment": c.segment,
            }
            for c in customers
        ],
        "total": total,
        "page": page,
        "pages": (total + limit - 1) // limit
    }


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