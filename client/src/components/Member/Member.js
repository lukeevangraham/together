import React from "react";

import classes from "./Member.module.scss";

const Member = ({ user }) => (
  <div>
    <div className={classes.member}>
      Hello {user.firstName}! What would you like to share?{" "}
    </div>
  </div>
);

export default Member;
