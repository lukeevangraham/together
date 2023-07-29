import React from "react";
import { connect } from "react-redux";

import classes from "./InitialProfileImage.module.scss";

const InitialProfileImage = ({ user, size, useCurrentUser, currentUser }) => (
  <div style={{ width: size, height: size, borderRadius: "50%" }}>
    <div style={{ fontSize: size * 0.7 }} className={classes.initialImage}>
      {useCurrentUser ? currentUser.firstName[0] : user.firstName[0]}
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  currentUser: state.auth,
});

export default connect(mapStateToProps)(InitialProfileImage);
