from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import traceback

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


@router.get("/campaigns")
def list_campaigns(
    db: Session = Depends(get_db)
):
    campaigns = (
        db.query(Campaign)
        .order_by(Campaign.created_at.desc())
        .all()
    )

    return [
        {
            "id": c.id,
            "name": c.name,
            "segment_name": c.segment_name,
            "channel": c.channel,
            "subject_line": c.subject_line,
            "message": c.message,
            "cta": c.cta,
            "status": c.status,
            "created_at": str(c.created_at) if c.created_at else None,
        }
        for c in campaigns
    ]


@router.post("/campaigns/generate")
def generate_campaign(
    request: CampaignRequest,
    db: Session = Depends(get_db)
):
    try:
        # Let Gemini choose the best audience segment
        all_segments = get_all_segment_stats(db)

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

    except Exception as e:
        db.rollback()
        print(f"Campaign generation error: {traceback.format_exc()}")

        # Fallback: create campaign with safe defaults
        fallback_segment = {"segment_name": "Dormant"}
        fallback_stats = get_segment_stats(db, "Dormant")
        fallback_campaign = {
            "campaign_name": "Win Back Campaign",
            "subject_line": "We Miss You!",
            "message": "Come back and enjoy an exclusive offer crafted just for you.",
            "cta": "Shop Now",
            "recommended_channel": "Email"
        }

        try:
            new_campaign = Campaign(
                name=fallback_campaign["campaign_name"],
                segment_name="Dormant",
                channel=fallback_campaign["recommended_channel"],
                subject_line=fallback_campaign["subject_line"],
                message=fallback_campaign["message"],
                cta=fallback_campaign["cta"],
                status="draft"
            )
            db.add(new_campaign)
            db.commit()
            db.refresh(new_campaign)

            return {
                "campaign_id": new_campaign.id,
                "selected_segment": fallback_segment,
                "segment_stats": fallback_stats,
                "status": "fallback",
                "campaign": fallback_campaign
            }
        except Exception:
            db.rollback()
            raise HTTPException(
                status_code=503,
                detail="Campaign generation temporarily unavailable. Please try again."
            )