import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import Button from "../UI/Button/Button";

import classes from "./Member.module.scss";

const Member = ({ user }) => {
  return (
    <div>
      <div className={classes.member}>
        <form action="" className={classes.newPostForm}>
          <TextareaAutosize
            className={classes.newPost}
            placeholder={`Hello ${user.userFirstName}!  What would you like to say?`}
            minRows={2}
            required
          />
          <div className={classes.submitButton}>
            <Button type="submit" color="green">
              Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Member;
