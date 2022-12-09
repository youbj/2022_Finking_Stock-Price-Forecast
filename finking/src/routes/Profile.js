import React, { useEffect, useState } from "react";
import { signOut, updateProfile, deleteUser } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "firebaseInstance";
import {
  collection,
  query,
  where,
  orderBy,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";

const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const user = authService.currentUser;

  const onLogOutClick = () => {
    signOut(authService);
    history.push("/");
  };

  const UserLogDel = async () => {
    await deleteDoc(doc(dbService, "user", userObj.email));
    await deleteUser(user);
    signOut(authService);
    history.push("/");
  };

  const getMyNweets = async () => {
    const nweetsQuery = await query(
      collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt")
    );

    const querySnapshot = await getDocs(nweetsQuery);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, {
        displayName: newDisplayName,
      });
      refreshUser();
      setNewDisplayName("");
    }
  };

  useEffect(() => {
    //getMyNweets();
  });

  const history2 = useHistory();

  const onClicklogin = () => {
    history2.push("/");
  };
  const onClickSurvey = () => {
    history2.push("/survey");
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="이름"
          value={newDisplayName}
          className="formInput"
        />
        <input
          type="submit"
          value="프로필 업데이트"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
        <span className="formBtn backBtn " onClick={onClickSurvey}>
          설문조사 진행하기
        </span>
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        로그아웃
      </span>
      <span className="formBtn cancelBtn" onClick={UserLogDel}>
        회원탈퇴
      </span>
      <span className="formBtn backBtn" onClick={onClicklogin}>
        뒤로가기
      </span>
    </div>
  );
};

export default Profile;
