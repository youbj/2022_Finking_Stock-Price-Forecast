
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from google.colab import files
uploaded = files.upload()

cred = credentials.Certificate('mykey.json')


dir = db.reference() #기본 위치 지정
print(dir.get())