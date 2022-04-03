import React from "react";

import classes from "./InitialProfileImage.module.scss";

const InitialProfileImage = ({ user, size }) => (
  <div style={{ width: size, height: size, borderRadius: "50%" }}>
    <div style={{ fontSize: size * 0.7 }} className={classes.initialImage}>
      {user.firstName[0]}
    </div>
  </div>
);

export default InitialProfileImage;
