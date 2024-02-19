from keras.models import load_model  # TensorFlow is required for Keras to work
from PIL import Image, ImageOps  # Install pillow instead of PIL
import numpy as np
import cv2
import os

# Disable scientific notation for clarity
np.set_printoptions(suppress=True)

# Load the model
model = load_model("keras_Model.h5", compile=False)

# Load the labels
class_names = open("labels.txt", "r").readlines()
data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)

video = cv2.VideoCapture(0)
facedetect = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")


def getImage():
    rect, frame = video.read()
    faces = facedetect.detectMultiScale(frame, 1.3, 5)
    for x, y, w, h in faces:
        photoCount += 1
        name = 'images/' + nameID + '/' + str(photoCount) + '.jpg'
        print(photoCount)
        cv2.rectangle(frame, (x,y), (x+w, y+h), (0, 255, 0), 3)
    cv2.imshow("Camera", frame)
    cv2.waitKey(1)

isDetected = True


while isDetected != False:
    # Replace this with the path to your image
    image = Image.open("60.jpg").convert("RGB")

    # resizing the image to be at least 224x224 and then cropping from the center
    size = (224, 224)
    image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)

    # turn the image into a numpy array
    image_array = np.asarray(image)

    # Normalize the image
    normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1

    # Load the image into the array
    data[0] = normalized_image_array

    # Predicts the model
    prediction = model.predict(data)
    index = np.argmax(prediction)
    class_name = class_names[index]
    confidence_score = prediction[0][index]

    # Print prediction and confidence score
    print("Class:", class_name[2:])
    print("Confidence Score:", confidence_score)
    if confidence_score > 0.9:
        break
