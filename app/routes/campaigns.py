from app.services.segment_service import get_all_segment_stats
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_db

from app.schemas.campaign import CampaignRequest

from app.services.segment_service import (
    get_segment_stats,
    get_all_segment_stats
)

from app.services.ai_service import (
    choose_best_segment,
    generate_campaign_content
)

from database.models.campaign import Campaign

router = APIRouter()


@router.post("/campaigns/generate")
def generate_campaign(
    request: CampaignRequest,
    db: Session = Depends(get_db)
):

    # Let Gemini choose the best audience segment
    all_segments = get_all_segment_stats(
        db
    )

    selected_segment = choose_best_segment(
        request.goal,
        all_segments
    )

    # Get real CRM statistics for that segment
    segment_stats = get_segment_stats(
        db,
        selected_segment["segment_name"]
    )

    # Generate campaign using CRM data
    campaign_data = generate_campaign_content(
        request.goal,
        segment_stats
    )

    # Save campaign to PostgreSQL
    new_campaign = Campaign(
        name=campaign_data["campaign_name"],
        segment_name=segment_stats["segment_name"],
        channel=campaign_data["recommended_channel"],
        subject_line=campaign_data["subject_line"],
        message=campaign_data["message"],
        cta=campaign_data["cta"],
        status="draft"
    )

    db.add(new_campaign)

    db.commit()

    db.refresh(new_campaign)

    return {
        "campaign_id": new_campaign.id,
        "selected_segment": selected_segment,
        "segment_stats": segment_stats,
        "status": new_campaign.status,
        "campaign": campaign_data
    }