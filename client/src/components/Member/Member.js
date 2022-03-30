import React from "react";
import { connect } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import Button from "../UI/Button/Button";
import { createPost } from "../../store/actions";

import classes from "./Member.module.scss";

const Member = ({ user, createPost }) => {
  const handlePostSubmit = (e) => {
    e.preventDefault();
    createPost({
      body: e.target[0].value,
      UserId: user.id,
    });
  };
  return (
    <div>
      {/* {console.log("LOOK HERE: ", user)} */}
      <div className={classes.member}>
        <form onSubmit={handlePostSubmit} className={classes.newPostForm}>
          <TextareaAutosize
            className={classes.newPost}
            placeholder={`Hello ${user.firstName}!  What would you like to say?`}
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

const mapStateToProps = (state) => ({
  user: state.auth,
});

export default connect(mapStateToProps, { createPost })(Member);
