import React from "react";

import classes from "./UserIntroCard.module.scss";

const UserIntroCard = ({ user }) =>
  user.Image ? (
    <div className={classes.userIntroCard}>
      <img
        src={user.Image.image}
        alt={user.Image.title}
        srcSet={`${user.Image.image.replace("upload/", "upload/w_125/")} 125w`}
      />
      <div className={classes.name}>
        {user.firstName} {user.lastName}
      </div>
    </div>
  ) : null;

export default UserIntroCard;
