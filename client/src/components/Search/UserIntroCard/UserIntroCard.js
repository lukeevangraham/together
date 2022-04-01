import React from "react";
import InitialProfileImage from "../../UI/InitalProfileImage/InitialProfileImage";
import Button from "../../UI/Button/Button";

import classes from "./UserIntroCard.module.scss";

const UserIntroCard = ({ user }) => (
  <div className={classes.userIntroCard}>
    {console.log("RES: ", user)}
    {user.ProfilePicture ? (
      <img
        src={user.ProfilePicture.image}
        alt={user.ProfilePicture.title}
        srcSet={`${user.ProfilePicture.image.replace(
          "upload/",
          "upload/w_125/"
        )} 125w`}
      />
    ) : (
      <InitialProfileImage user={user} size={80} />
    )}
    <div className={classes.name}>
      {user.firstName} {user.lastName}
    </div>
    <div className={classes.followButton}>
      <Button color={"green"}>Follow</Button>
    </div>
  </div>
);

export default UserIntroCard;
