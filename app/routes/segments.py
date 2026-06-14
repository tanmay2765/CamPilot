from fastapi import APIRouter

from app.schemas.segment import SegmentRequest
from app.services.ai_service import generate_segment_strategy

router = APIRouter()

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