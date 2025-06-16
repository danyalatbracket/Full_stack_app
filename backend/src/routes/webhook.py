from fastapi import APIRouter, Request, HTTPException, Depends
from ..database.db import create_challenge_quota
from ..database.models import get_db
from svix.webhooks import Webhook


import os
import json
from dotenv import load_dotenv

load_dotenv()
router = APIRouter()


@router.post("/clerk")
async def handle_user_created(request: Request, db=Depends(get_db)):
    webhook_secret = os.getenv("CLERK_WEBHOOK_SECRET")
    if not webhook_secret:
        raise HTTPException(status_code=500, detail="CLERK_WEBHOOK_SECRET not set")

    body = await request.body()
    paylaod = body.decode("utf-8")
    headers = dict(request.headers)

    try:
        webhook = Webhook(webhook_secret)
        webhook.verify(paylaod, headers)

        data = json.loads(paylaod)

        if data.get("type") != "user.created":
            return {"status", "ignored"}

        user_data = data.get("data", {})

        user_id = user_data.get("id")

        create_challenge_quota(db, user_id)

        return {"status": "succes"}
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))
