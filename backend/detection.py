from keras.models import load_model  # TensorFlow is required for Keras to work
from PIL import Image, ImageOps  # Install pillow instead of PIL
import numpy as np
import cv2
import json

np.set_printoptions(suppress=True)
model = load_model("keras_Model.h5", compile=False)



data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)


'''try:
    cap = cv2.VideoCapture('http://192.168.18.212:8080/video')
except:
    cap = cv2.VideoCapture(0)
'''
cap = cv2.VideoCapture(0)


successiveCount = 0

class_names = open("labels.txt", "r").readlines()
attendenceJSON = {"details" : []}

for count, name in enumerate(class_names):
    attendenceJSON[int(count)] = [name.split(' ')[1].split('\n')[0], False]

for count, name in enumerate(class_names):
    attendenceJSON["details"].append({"id": str(count), "name": name.split(' ')[1].split('\n')[0], "status": False})

#attendenceJSON.pop(4)

print(attendenceJSON)


while True:
    ret, frame = cap.read()
    
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    
    resized_frame = cv2.resize(rgb_frame, (224, 224))
    normalized_frame = (resized_frame.astype(np.float32) / 127.5) - 1
    
    data[0] = normalized_frame
    
    prediction = model.predict(data)
    index = np.argmax(prediction)
    class_name = class_names[index]
    confidence_score = prediction[0][index]
    
    # Display prediction and confidence score
    cv2.putText(frame, f"Class: {class_name[2:]}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    cv2.putText(frame, f"Confidence Score: {confidence_score}", (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    
    # Display the frame
    cv2.imshow('Real-time Object Detection', frame)
    
    # Break the loop if 'q' is pressed
    if(class_name[2:] == 'bg'):
        successiveCount = 0
    elif confidence_score > 0.8 and class_name[2:] != 'bg':
        successiveCount += 1

    print(successiveCount)
    print("Class:", class_name[2:]+':')

    if successiveCount > 20:
        cv2.putText(frame, f"Person: {class_name[2:]}", (10, 90), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        cv2.putText(frame, f"Attendence registered", (10, 120), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        print("Class:", class_name[2:]+':')
        print("Confidence Score:", confidence_score)

        with open('db.json', "r") as json_file:
            attendenceJSON = json.load(json_file)

        attendenceJSON["details"][index]["status"] = True
        #break
        successiveCount = 0
        with open('db.json', "w") as json_file:
            json.dump(attendenceJSON, json_file)
            print(attendenceJSON)

        
        cv2.waitKey(2000)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the webcam and close all OpenCV windows
cap.release()
cv2.destroyAllWindows()