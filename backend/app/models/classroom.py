from sqlalchemy import Column, Text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid
from ..db import Base

class Classroom(Base):
    __tablename__ = "class"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    class_code = Column(Text, unique=True)
    teacher_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
