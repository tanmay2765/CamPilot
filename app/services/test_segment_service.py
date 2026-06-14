from database.connection import SessionLocal
from app.services.segment_service import (
    get_segment_stats
)

db = SessionLocal()

print(
    get_segment_stats(
        db,
        "Dormant"
    )
)