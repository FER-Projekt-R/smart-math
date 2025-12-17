from jose import jwt, JWTError
from app.config import SECRET_KEY, ALGORITHM
from db import SessionLocal
from models import User


async def authenticate_socket(environ):
    token = None

    # Socket.IO auth payload
    scope = environ.get("asgi.scope")
    if scope:
        auth = scope.get("auth")
        if auth:
            token = auth.get("token")

    # Fallback: Authorization header
    if not token:
        token = environ.get("HTTP_AUTHORIZATION")

    if not token:
        return None

    if token.startswith("Bearer "):
        token = token[7:]


    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("id")
        if not user_id:
            return None
    except JWTError:
        return None

    db = SessionLocal()
    return db.query(User).filter(User.id == user_id).first()

