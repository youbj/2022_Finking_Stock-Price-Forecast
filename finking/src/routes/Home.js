import React, { useState, useEffect, useRef } from "react";
import { dbService, storageService } from "firebaseInstance";
import { orderBy, collection, onSnapshot, query } from "firebase/firestore";
import Nweet from "./Nweet";
import NweetFactory from "components/NweetFactory";
import { useHistory } from "react-router-dom";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    const nweetsQuery = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(nweetsQuery, (querySnapshot) => {
      const nweetArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
