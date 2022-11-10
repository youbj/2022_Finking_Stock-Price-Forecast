import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import imgLogo from "../img/Logo.png";
import { authService, dbService } from "firebaseInstance";
import { doc, setDoc, collection, getDoc } from "firebase/firestore";

const Home = ({ userObj }) => {
  const history = useHistory();
  const SaveGoogle = async (event) => {
    event.preventDefault();

    try {
      if (userObj.emailVerified === false) {
      } else {
        await setDoc(doc(dbService, "user", userObj.email), {
          name: userObj.displayName,
          user: userObj.email,
          createdAt: Date.now(),
          usercode: "0",
        });
      }
    } catch (error) {}
  };

  const goSurvey = async () => {
    //아직 한번도 안한 사람들
    console.log(userObj);
    const docRef = doc(dbService, "user", userObj.email);
    const docSnap = await getDoc(docRef);

    console.log(docSnap._document.data.value.mapValue.fields.usercode);

    try {
      if (
        docSnap._document.data.value.mapValue.fields.usercode.stringValue ===
        "0"
      )
        history.push("/survey");
    } catch (error) {}
  };

  return (
    <div className="mainframe">
      <nav className="navbar">
        <ul
          style={{
            display: "flex",
            justifyContent: "right",
            marginRight: 70,
            margin: 0,
          }}
        >
          <li>
            <Link to="/" onClick={SaveGoogle} style={{ marginRight: 110 }}>
              <img src={imgLogo} width="150" />
            </Link>
          </li>
          <li>
            <span
              style={{
                fontSize: 25,
                color: "#222222",
                marginRight: 670,
                paddingTop: 30,
              }}
            >
              overview
            </span>
          </li>
          <li style={{ width: 200, marginRight: 30 }}>
            <Link
              to="/profile"
              style={{
                marginRight: 15,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontSize: 18,
                color: "#222222",
              }}
            >
              <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
              <span style={{ marginTop: 10 }}>
                {userObj?.displayName?.length
                  ? `${userObj.displayName}`
                  : "닉네임"}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="parent_main">
        <div className="part1">
          <ul className="menu">
            <li className="menuset">메뉴1</li>
            <li className="menuset">메뉴2</li>
            <li className="menuset">메뉴3</li>
            <li className="menuset">메뉴4</li>
            <li className="menuset">메뉴5</li>
            <li className="menuset">메뉴6</li>
          </ul>
        </div>
        <div className="part2">
          <div className="parent" style={{}}>
            <div className="rone"></div>
            <div className="rtwo"></div>
            <div className="rthree"></div>
          </div>
          <div className="parent" style={{ marginTop: 30 }}>
            <div className="one"></div>
            <div className="two">
              <button onClick={goSurvey} style={{ width: 100, height: 100 }}>
                실시간 인기 주식
              </button>
            </div>
          </div>
          <div className="parent" style={{ marginTop: 30 }}>
            <div className="tone"></div>
          </div>
        </div>
        <div className="part3"></div>
      </div>
    </div>
  );
};

export default Home;
