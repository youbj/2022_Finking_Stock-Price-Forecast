import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { authService, dbService } from 'firebaseInstance';
import { doc, setDoc, collection, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

import imgLogo from '../img/Logo.png';
import imghome from '../img/home.png';
import imgcuration from '../img/curation.png';
import imgstock from '../img/stock.png';
import imgprediction from '../img/prediction.png';
import imgsetting from '../img/setting.png';
import imgexit from '../img/exit.png';
import imguser from '../img/user1.png';
import imgtag1 from '../img/growth.png';
import imgtag2 from '../img/IT.png';
import imgtag3 from '../img/20.png';

const Home = ({ userObj }) => {
  const history = useHistory();
  const SaveGoogle = async (event) => {
    event.preventDefault();

    try {
      if (userObj.emailVerified === false) {
      } else {
        await setDoc(doc(dbService, 'user', userObj.email), {
          name: userObj.displayName,
          user: userObj.email,
          createdAt: Date.now(),
          usercode: '0',
        });
      }
    } catch (error) {}
  };
  const onLogOutClick = () => {
    signOut(authService);
    history.push('/');
  };

  const goSurvey = async () => {
    //아직 한번도 안한 사람
    const docRef = doc(dbService, 'user', userObj.email);
    const docSnap = await getDoc(docRef);
    try {
      console.log(docSnap);
      if (
        docSnap._document.data.value.mapValue.fields.usercode.stringValue ===
        '0'
      )
        history.push('/survey');
    } catch (error) {}
  };

  return (
    <div className="mainframe">
      <div className="parent_main">
        <div className="part1">
          <ul className="menu">
            <Link to="/" onClick={SaveGoogle} style={{ marginRight: 30 }}>
              <img src={imgLogo} width="150" style={{ marginLeft: 50 }} />
            </Link>
            <div className="menu_null"></div>
            <li className="menuset" style={{ color: '#40489C' }}>
              <img
                src={imghome}
                width="30"
                style={{ marginRight: 20, marginLeft: 30 }}
              />
              MainPage
            </li>
            <li className="menuset">
              <img
                src={imgcuration}
                width="30"
                style={{ marginRight: 20, marginLeft: 30 }}
              />
              Curation
            </li>
            <li className="menuset">
              <img
                src={imgstock}
                width="40"
                style={{ marginRight: 15, marginLeft: 25 }}
              />
              Stock
            </li>
            <li className="menuset">
              <img
                src={imgprediction}
                width="30"
                style={{ marginRight: 20, marginLeft: 30 }}
              />
              Prediction
            </li>
          </ul>
        </div>
        <div className="part2">
          <div className="parent">
            <span
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: '#222222',
                marginTop: 20,
              }}
            >
              Curation : Industry
            </span>
          </div>
          <div className="parent" style={{}}>
            <div className="rone"></div>
            <div className="rtwo"></div>
            <div className="rthree"></div>
          </div>
          <div className="parent">
            <span
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: '#222222',
                marginTop: 10,
              }}
              className="margin_null"
            >
              Interest Stock
            </span>
            <span
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: '#222222',
                marginTop: 10,
                marginLeft: 305,
              }}
              className="margin_null"
            >
              Popular Stock
            </span>
          </div>
          <div className="parent" style={{}}>
            <div className="one"></div>
            <div className="two">
              <div className="popstock" onClick={goSurvey}>
                <div className="pop_list">
                  <div style={{ marginBottom: 5 }}>
                    <label className="pop_stockname inline">1. </label>
                    <label className="pop_stockname red inline">삼성전자</label>
                  </div>
                  <div style={{ marginBottom: 5 }}>
                    <label className="pop_stockname inline">2. </label>
                    <label className="pop_stockname red inline">카카오</label>
                  </div>
                  <div style={{ marginBottom: 5 }}>
                    <label className="pop_stockname inline">3. </label>
                    <label className="pop_stockname red inline">
                      SK하이닉스
                    </label>
                  </div>
                  <div style={{ marginBottom: 5 }}>
                    <label className="pop_stockname inline">4. </label>
                    <label className="pop_stockname red inline">NAVER</label>
                  </div>
                  <div style={{ marginBottom: 5 }}>
                    <label className="pop_stockname inline">5. </label>
                    <label className="pop_stockname red inline">
                      삼성전자우
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="parent" style={{ marginTop: 20 }}>
            <div className="tone">
              <div style={{ margin: 15 }}>
                <span
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: '#222222',
                    marginTop: 10,
                  }}
                  className="margin_null"
                >
                  Tomorrow's prediction price
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="part3">
          <div className="part3_top">
            <Link to="/profile">
              <img src={imgsetting} width="25" className="part3_icon" />
            </Link>
            <Link>
              <img
                src={imgexit}
                width="25"
                className="part3_icon"
                style={{ marginRight: 30 }}
                onClick={onLogOutClick}
              />
            </Link>
          </div>
          <div className="part3_parent">
            <div
              style={{
                marginRight: 15,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 18,
                color: '#222222',
              }}
            >
              <img src={imguser} width="150" />
              <span style={{ marginTop: 20, fontSize: 20, fontWeight: 'bold' }}>
                {userObj?.displayName?.length
                  ? `${userObj.displayName}`
                  : '닉네임'}
              </span>
            </div>
          </div>
          <div
            className="part3_parent"
            style={{ justifyContent: 'left', marginTop: 50, marginBottom: 20 }}
          >
            <label className="part3_type">Type</label>
          </div>
          <div className="part3_parent" style={{ marginRight: 25 }}>
            <img src={imgtag1} width="200" />
          </div>
          <div className="part3_parent" style={{ marginRight: 25 }}>
            <img src={imgtag2} width="200" />
          </div>
          <div className="part3_parent" style={{ marginRight: 25 }}>
            <img src={imgtag3} width="200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
