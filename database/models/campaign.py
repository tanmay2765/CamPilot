from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime
)

from sqlalchemy.sql import func

from database.connection import Base


class Campaign(Base):

    __tablename__ = "campaigns"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )

    segment_name = Column(
        String,
        nullable=False
    )

    channel = Column(
        String,
        nullable=False
    )

    subject_line = Column(
        String
    )

    message = Column(
        Text
    )

    cta = Column(
        String
    )

    status = Column(
        String,
        default="draft"
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )