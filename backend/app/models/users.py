from sqlalchemy import Column, Text, TIMESTAMP, CheckConstraint, ForeignKey, SmallInteger
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from ..db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(Text, nullable=False, unique = True)
    password = Column(Text)  # optional: teacher ima, student nema
    role = Column(Text, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    #deprecated but left for backwards compatibility
    current_difficulty = Column(SmallInteger, nullable=False, default=3) #početni difficulty za svakog učenika je 3 da ga možemo odmah i dizati i spuštati

    #TODO: refactor to use student_topic_difficulty, this is just a temporary solution
    difficulty_do_sto = Column(SmallInteger, nullable=False, default=3)
    difficulty_zbrajanje = Column(SmallInteger, nullable=False, default=3)
    difficulty_mnozenje = Column(SmallInteger, nullable=False, default=3)


    __table_args__ = (
        CheckConstraint("difficulty BETWEEN 1 AND 5", name="difficulty_check"),
        CheckConstraint("role IN ('student','teacher')", name="role_check"),
    )