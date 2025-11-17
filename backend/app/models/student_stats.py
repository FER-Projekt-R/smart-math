from sqlalchemy import Column, Integer, Numeric, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from ..db import Base

class StudentStats(Base):
    __tablename__ = "student_stats"

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True)
    total_attempts = Column(Integer, default=0)
    overall_accuracy = Column(Numeric, default=0)
    xp = Column(Integer, default=0)
