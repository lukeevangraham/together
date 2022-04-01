import React, { useEffect } from "react";
import { connect } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import Button from "../UI/Button/Button";
import InitialProfileImage from "../UI/InitalProfileImage/InitialProfileImage";
import { createPost, fetchPosts } from "../../store/actions";

import classes from "./Member.module.scss";

const Member = ({ user, createPost, fetchPosts, posts }) => {
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    createPost({
      body: e.target[0].value,
      UserId: user.id,
    });
  };
  return (
    <div className={classes.posts}>
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
        <div className={classes.fromFollowings}>
          {posts
            ? posts.map((post) => (
                <div key={post.id} className={classes.postCard}>
                  {console.log("POST: ", post.User.ProfilePicture)}
                  {post.User.ProfilePicture ? (
                    <img
                      src={post.User.ProfilePicture.image}
                      alt=""
                      srcset=""
                    />
                  ) : (
                    <InitialProfileImage size={100} user={post.User} />
                  )}
                  {post.body}
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth,
  posts: state.posts.posts,
});

export default connect(mapStateToProps, { createPost, fetchPosts })(Member);
