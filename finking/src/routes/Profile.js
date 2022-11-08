import React, { useEffect, useState } from "react";
import { signOut, updateProfile } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "firebaseInstance";
import {
  collection,
  query,
  where,
  orderBy,
  QuerySnapshot,
  getDocs,
} from "firebase/firestore";

const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    signOut(authService);
    history.push("/");
  };

  const getMyNweets = async () => {
    const nweetsRef = await collection(dbService, "nweets");

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
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        로그아웃
      </span>
    </div>
  );
};

export default Profile;
