from database.connection import SessionLocal

from app.services.segment_service import (
    get_segment_stats
)

from app.services.ai_service import (
    generate_campaign_strategy
)

db = SessionLocal()

stats = get_segment_stats(
    db,
    "Dormant"
)

result = generate_campaign_strategy(
    "Increase repeat purchases",
    stats
)

print(result)