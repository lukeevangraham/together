import React from "react";
import { connect } from "react-redux";
import InitialProfileImage from "../../UI/InitalProfileImage/InitialProfileImage";
import Button from "../../UI/Button/Button";
import { followUser, unfollowUser } from "../../../store/actions/";

import classes from "./UserIntroCard.module.scss";

const UserIntroCard = ({ user, followUser, unfollowUser, followed }) => {
  const handleFollowClick = (e) => {
    e.preventDefault();
    followUser({ followingUserId: user.id });
  };

  const handleUnfollowClick = (e, userIdToUnfollow) => {
    e.preventDefault();
    unfollowUser(userIdToUnfollow);
  };

  return (
    <div className={classes.userIntroCard}>
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
        {followed ? (
          <Button
            clicked={(e) => handleUnfollowClick(e, user.id)}
            color={"green"}
          >
            Unfollow
          </Button>
        ) : (
          <Button clicked={handleFollowClick} color={"green"}>
            Follow
          </Button>
        )}
      </div>
    </div>
  );
};

export default connect(null, { followUser, unfollowUser })(UserIntroCard);
