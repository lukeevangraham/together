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
            ? posts.map((post) => {
                const postDate = new Date(post.createdAt);
                return (
                  <div key={post.id} className={classes.postCard}>
                    {console.log("POST: ", post)}
                    {console.log("USER: ", user)}
                    {post.User.ProfilePicture ? (
                      <img
                        src={post.User.ProfilePicture.image}
                        alt=""
                        srcset=""
                      />
                    ) : (
                      <InitialProfileImage size={100} user={post.User} />
                    )}
                    <div className={classes.text}>
                      <div className={classes.topText}>
                        <div>
                          <div className={classes.name}>
                            {post.User.firstName} {post.User.lastName}
                          </div>
                          <div className={classes.when}>
                            {`${postDate.toLocaleString("en-US", {
                              month: "long",
                              day: "numeric",
                            })}`}{" "}
                            at{" "}
                            <span
                              style={{ textTransform: "lowercase" }}
                            >{`${postDate.toLocaleString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                            })}`}</span>
                          </div>
                        </div>
                        {post.UserId === user.id ? (
                          <>
                            <svg className={classes.topText__icon}>
                              <use xlinkHref="/images/sprite.svg#icon-edit"></use>
                            </svg>
                            <svg className={classes.topText__icon}>
                              <use xlinkHref="/images/sprite.svg#icon-trash"></use>
                            </svg>
                          </>
                        ) : null}
                      </div>
                      <div className={classes.body}>{post.body}</div>
                    </div>
                  </div>
                );
              })
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
