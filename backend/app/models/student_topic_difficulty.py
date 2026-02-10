from sqlalchemy import Column, Text, TIMESTAMP, ForeignKey, CheckConstraint, SmallInteger
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from ..db import Base


#TODO: refactoring da se koristi ova tablica umjesto difficulty dict u users tablici
class StudentTopicDifficulty(Base):
    __tablename__ = "student_topic_difficulty"

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True)  # student
    topic_id = Column(UUID(as_uuid=True), ForeignKey("topics.id"), primary_key=True)
    current_difficulty = Column(SmallInteger, nullable=False, default=3) #početni difficulty


