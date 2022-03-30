import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home.js";
import Member from "./components/Member/Member.js";
import Profile from "./components/Member/Profile/Profile";
import Search from "./components/Search/Search";
import { getUser } from "./store/actions";
import "@fontsource/nunito";
import "@fontsource/nunito/800.css";

const App = ({ userEmail, userId, userFirstName, userLastName, getUser }) => {
  useEffect(() => {
    getUser();
  }, [getUser, userId]);

  let routes = (
    <Routes>
      <Route path="/" element={Home} />
      <Route path="*" element={Home} />
    </Routes>
  );

  if (userEmail) {
    routes = (
      <Layout>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/search/:term"
            exact
            element={
              <Search
                user={{ userEmail, userId, userFirstName, userLastName }}
              />
            }
          />
          <Route
            path="/"
            element={
              <Member
                user={{ userEmail, userId, userFirstName, userLastName }}
              />
            }
          />
        </Routes>
      </Layout>
    );
  }

  return <BrowserRouter>{routes}</BrowserRouter>;
};

const mapStateToProps = (state) => ({
  userEmail: state.auth.email,
  userId: state.auth.id,
  userFirstName: state.auth.firstName,
  userLastName: state.auth.lastName,
});

export default connect(mapStateToProps, { getUser })(App);
