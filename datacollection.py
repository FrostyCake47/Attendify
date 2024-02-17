import cv2
import os

video = cv2.VideoCapture('http://192.168.29.118:8080/video')

facedetect = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

photoCount = 0

nameID = input("Enter your name: ")
PATH = 'images/' + nameID

if os.path.exists(PATH):
    print("Your name already exist in the database.");
    exit() 
else:
    os.makedirs(PATH)
    

while photoCount < 100:
    rect, frame = video.read()
    faces = facedetect.detectMultiScale(frame, 1.3, 5)
    for x, y, w, h in faces:
        photoCount += 1
        name = 'images/' + nameID + '/' + str(photoCount) + '.jpg'
        print(photoCount)
        cv2.imwrite(name, frame[y:y+h, x:x+w])
        cv2.rectangle(frame, (x,y), (x+w, y+h), (0, 255, 0), 3)
    cv2.imshow("Camera", frame)
    cv2.waitKey(1)

video.release()
cv2.destroyAllWindows()