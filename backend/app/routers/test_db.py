from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..db import get_db
from ..models.users import User

router = APIRouter()

@router.get("/count_users", summary="Broj korisnika u bazi")
def count_users(db: Session = Depends(get_db)):
    count = db.query(User).count()
    return {"user_count": count}
