import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "routes/Profile";
import Signin from "./Signin";
import Forgotpassword from "./Forgotpassword";
import Survey from "survey/Survey";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      <Switch>
        <>
          {isLoggedIn ? (
            <div
              style={{
                maxWidth: 1300,
                width: "100%",
                margin: "0 auto",
                marginTop: 80,
                marginBottom: 80,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Route exact path="/">
                <Home userObj={userObj} />
              </Route>
              <Route exact path="/profile">
                <Profile userObj={userObj} refreshUser={refreshUser} />
              </Route>
              <Route exact path="/survey">
                <Survey userObj={userObj} />
              </Route>
            </div>
          ) : (
            <div>
              <Route exact path="/">
                <Auth userObj={userObj} />
              </Route>
              <Route exact path="/signin">
                <Signin />
              </Route>
              <Route exact path="/password">
                <Forgotpassword userObj={userObj} />
              </Route>
            </div>
          )}
        </>
      </Switch>
    </Router>
  );
};

export default AppRouter;
