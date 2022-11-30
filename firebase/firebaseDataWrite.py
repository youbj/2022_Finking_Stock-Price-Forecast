
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db


cred = credentials.Certificate('mykey.json')

ref = db.reference() #db 위치 지정
ref.update({'청주' : '고슴도치'}) #해당 변수가 없으면 생성한다.

dir = db.reference('이동수단/기차')
dir.update({'1번':'KTX'})
dir.update({'2번':'무궁화'})