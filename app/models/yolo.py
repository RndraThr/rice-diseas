from ultralytics import YOLO
model = YOLO("best.pt")

def detect_image(image_path):
    results = model(image_path)
    boxes = results[0].boxes
    if len(boxes) == 0:
        return None, None

    pred_class = int(boxes.cls[0])
    class_name = model.names[pred_class]
    return class_name, boxes