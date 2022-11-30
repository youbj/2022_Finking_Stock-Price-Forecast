import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate('mykey.json')
firebase_admin.initialize_app(cred,{
    'databaseURL' : 'https://finking-ccd6d-default-rtdb.firebaseio.com/'
})
ref = db.reference() #db 위치 지정
ref.update({'청주' : '고슴도치'}) #해당 변수가 없으면 생성한다.