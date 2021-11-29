import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home.js";
import Member from "./components/Member/Member.js";
import Profile from "./components/Member/Profile/Profile";
import { getUser } from "./store/actions";
import "@fontsource/nunito";
import "@fontsource/nunito/800.css";

const App = ({ user, getUser }) => {
  useEffect(() => {
    getUser();
  }, [getUser, user.email]);

  let routes = (
    <Routes>
      <Route path="/" element={Home} />
    </Routes>
  );

  if (user.email) {
    routes = (
      <Layout>
        <Routes>
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/" element={<Member user={user} />} />
        </Routes>
      </Layout>
    );
  }

  return <BrowserRouter>{routes}</BrowserRouter>;
};

const mapStateToProps = (state) => ({
  user: state.auth,
});

export default connect(mapStateToProps, { getUser })(App);
