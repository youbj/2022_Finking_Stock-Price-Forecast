#hi
import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("mykey.json")
firebase_admin.initialize_app(cred,{
    'databaseURL' : 'https://finking-ccd6d-default-rtdb.firebaseio.com/' 
    #'databaseURL' : '데이터 베이스 url'
})

ref = db.reference() #db 위치 지정, 기본 가장 상단을 가르킴
ref.update({'이름' : '김철수'}) #해당 변수가 없으면 생성한다.
