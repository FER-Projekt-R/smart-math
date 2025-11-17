from sqlalchemy import Column, Text, Numeric, ForeignKey, CheckConstraint
from sqlalchemy.dialects.postgresql import UUID
import uuid
from ..db import Base

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    round_id = Column(UUID(as_uuid=True), ForeignKey("rounds.id", ondelete="CASCADE"))
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    rec = Column(Text)
    confidence = Column(Numeric)

    __table_args__ = (
        CheckConstraint("rec IN ('up','same','down')", name="rec_check"),
    )
