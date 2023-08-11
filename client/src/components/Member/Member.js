import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// import TextareaAutosize from "react-textarea-autosize";
// import Button from "../UI/Button/Button";
import PostInputForm from "./PostInputForm/PostInputForm";
import InitialProfileImage from "../UI/InitalProfileImage/InitialProfileImage";
import {
  createPost,
  fetchPosts,
  deletePost,
  editPost,
} from "../../store/actions";

import classes from "./Member.module.scss";

const Member = ({
  user,
  createPost,
  fetchPosts,
  deletePost,
  editPost,
  posts,
}) => {
  let [editingMode, setEditingMode] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    createPost({
      body: e.target[0].value,
      UserId: user.id,
    });
    e.target[0].value = "";
  };

  const handlePostUpdate = (e, postId) => {
    e.preventDefault();
    editPost({ body: e.target[0].value, id: postId });
    setEditingMode(0);
  };

  const initiateEditingMode = (postId) => {
    setEditingMode(postId);
  };

  return (
    <div className={classes.posts}>
      <div className={classes.member}>
        <PostInputForm handlePostSubmit={handlePostSubmit} user={user} />
        <div className={classes.fromFollowings}>
          {posts
            ? posts.map((post) => {
                const postDate = new Date(post.createdAt);

                return (
                  <div key={post.id} className={classes.postCard}>
                    {post.User && post.User.ProfilePicture ? (
                      <img src={post.User.ProfilePicture.image} alt="" />
                    ) : (
                      // if this is a newly created post, not yet fully in state, profile image will be grabbed from auth reducer instead of post reducer
                      // "post.UserId" is a backup of authorInfo since it's not yet processed in state
                      <InitialProfileImage
                        size={100}
                        user={post.User}
                        useCurrentUser={post.UserId === user.id ? true : false}
                      />
                    )}
                    <div className={classes.text}>
                      <div className={classes.topText}>
                        <div>
                          <div className={classes.name}>
                            {/* if this is a newly created post, not yet fully in state, profile image will be grabbed from auth reducer instead of post reducer */}
                            {post.UserId === user.id
                              ? user.firstName
                              : post.User.firstName}{" "}
                            {/* if this is a newly created post, not yet fully in state, profile image will be grabbed from auth reducer instead of post reducer */}
                            {post.UserId === user.id
                              ? user.lastName
                              : post.User.lastName}
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
                        {post.UserId === user.id || post.UserId === user.id ? (
                          <>
                            <svg
                              className={classes.topText__icon}
                              onClick={() => initiateEditingMode(post.id)}
                            >
                              <use xlinkHref="/images/sprite.svg#icon-edit"></use>
                            </svg>
                            <svg
                              onClick={() => deletePost(post.id)}
                              className={classes.topText__icon}
                            >
                              <use xlinkHref="/images/sprite.svg#icon-trash"></use>
                            </svg>
                          </>
                        ) : null}
                      </div>
                      {editingMode && post.id === editingMode ? (
                        // <TextareaAutosize
                        //   className={classes.editPost}
                        //   defaultValue={post.body}
                        //   autoFocus
                        //   // onChange={e => setValue(e.target.value)}
                        // />
                        <PostInputForm
                          value={post.body}
                          user={user}
                          handlePostSubmit={(e) => handlePostUpdate(e, post.id)}
                        />
                      ) : (
                        <div className={classes.body}>{post.body}</div>
                      )}
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

export default connect(mapStateToProps, {
  createPost,
  fetchPosts,
  deletePost,
  editPost,
})(Member);
