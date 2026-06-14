from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.segment import SegmentRequest
from app.services.ai_service import generate_segment_strategy
from app.services.segment_service import get_all_segment_stats
from app.dependencies import get_db

router = APIRouter()


@router.get("/segments/stats")
def segment_stats(
    db: Session = Depends(get_db)
):
    return get_all_segment_stats(db)


@router.post("/segments/generate")
def generate_segment(
    request: SegmentRequest
):

    result = generate_segment_strategy(
        request.goal
    )

    return {
        "goal": request.goal,
        "ai_response": result
    }