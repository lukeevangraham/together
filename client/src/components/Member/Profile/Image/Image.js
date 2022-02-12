import React, { useState } from "react";
import { connect } from "react-redux";
import { addImage } from "../../../../store/actions";

import customClasses from "./Image.module.scss";

const Image = ({ addImage, userId, classes, existingImage }) => {
  let [image, setImage] = useState("");

  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // console.log("SUBMITTED: ", image)
    let formData = new FormData();
    formData.append("image", image);
    formData.append("userId", userId);
    // formData.append("text: ", "hello")
    // for (var value of formData.values()) {
    //     console.log(value)
    // }
    addImage(formData);
    setImage("");
  };

  return (
    <>
      <h2>Your Image</h2>
      {console.log("EXISTING: ", existingImage)}
      <form
        encType="multipart/form-data"
        onSubmit={onSubmit}
        className={classes.settings__form}
      >
        <div style={{ position: "relative", width: "300px" }}>
          <img
            style={{ borderRadius: "50%" }}
            src={existingImage.image}
            srcSet={`${existingImage.image.replace(
              "upload/",
              "upload/w_300/"
            )} 300w`}
            sizes="300px"
            alt=""
          />
          <label className={customClasses.customFileUpload}>
            <input
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-17%, -50%)",
                color: "transparent",
              }}
              type="file"
              name="image"
              id="image"
              onChange={onChangeImage}
            />
            Choose File
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default connect(null, { addImage })(Image);
