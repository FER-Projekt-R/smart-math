from sqlalchemy import Column, Text, TIMESTAMP, ForeignKey, CheckConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from ..db import Base

class TeacherAction(Base):
    __tablename__ = "teacher_actions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    teacher_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))  # student
    action = Column(Text)
    recommendation_id = Column(UUID(as_uuid=True), ForeignKey("recommendations.id"))
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    __table_args__ = (
        CheckConstraint("action IN ('override_up','override_down','accept')", name="action_check"),
    )
