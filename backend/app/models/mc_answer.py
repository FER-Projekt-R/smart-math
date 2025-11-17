from sqlalchemy import Column, Text, ForeignKey, CheckConstraint
from sqlalchemy.dialects.postgresql import UUID
import uuid
from ..db import Base

class McAnswer(Base):
    __tablename__ = "mc_answer"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    question_id = Column(UUID(as_uuid=True), ForeignKey("questions.id", ondelete="CASCADE"))
    option_a = Column(Text, nullable=False)
    option_b = Column(Text, nullable=False)
    option_c = Column(Text, nullable=False)
    correct_answer = Column(Text)

    __table_args__ = (
        CheckConstraint("correct_answer IN ('a','b','c')", name="mc_correct_check"),
    )
