from pydantic import BaseModel


class SegmentRequest(BaseModel):
    goal: str