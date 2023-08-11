import Button from "../../UI/Button/Button";
import TextareaAutosize from "react-textarea-autosize";

import classes from "./PostInputForm.module.scss";

const PostInputForm = ({ handlePostSubmit, user, value: givenValue }) => (
  <form onSubmit={handlePostSubmit} className={classes.newPostForm}>
    <TextareaAutosize
      className={classes.newPost}
      placeholder={`Hello ${user.firstName}!  What would you like to say?`}
      minRows={2}
      required
      defaultValue={givenValue ? givenValue : null}
    />
    <div className={classes.submitButton}>
      <Button type="submit" color="green">
        {givenValue ? "Save" : "Post"}
      </Button>
    </div>
  </form>
);

export default PostInputForm;
