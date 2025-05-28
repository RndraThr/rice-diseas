from fastapi import APIRouter, Request, UploadFile, File
from fastapi.templating import Jinja2Templates
import shutil
import os
import json
from app.models.yolo import detect_image

router = APIRouter()
templates = Jinja2Templates(directory="app/templates")

with open("rice-info.json", "r") as f:
    rice_info = json.load(f)

@router.post("/detect")
async def detect(request: Request, file: UploadFile = File(...)):
    temp_path = f"app/static/{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    class_name, boxes = detect_image(temp_path)
    if class_name:
        info = rice_info.get(class_name, {})
        result = {
            "image": f"/static/{file.filename}",
            "class": class_name,
            "info": info
        }
    else:
        result = {
            "image": f"/static/{file.filename}",
            "class": "Tidak terdeteksi",
            "info": {}
        }

    return templates.TemplateResponse("index.html", {
        "request": request,
        "result": result
    })
