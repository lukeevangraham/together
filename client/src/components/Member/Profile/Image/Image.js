import React, { useState } from "react";
import { connect } from "react-redux";
import { addUserImage } from "../../../../store/actions";
import InitialProfileImage from "../../../UI/InitalProfileImage/InitialProfileImage";
import Button from "../../../UI/Button/Button";

import customClasses from "./Image.module.scss";

const Image = ({ addUserImage, userId, classes, existingImage, user }) => {
  let [image, setImage] = useState("");
  let [uploadedImage, setUploadedImage] = useState("");

  const onChangeImage = (e) => {
    console.log("IMAGE CHANGED! ", e.target.files[0]);
    // var reader = new FileReader();
    // var url = reader.readAsDataURL(e.target.files[0]);
    // console.log("OTHER: URL: ", URL.createObjectURL(e.target.files[0]));

    setImage(e.target.files[0]);
    setUploadedImage(URL.createObjectURL(e.target.files[0]));
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
    addUserImage(formData);
    setImage("");
  };

  return (
    <>
      <h2>Your Image</h2>
      <form
        encType="multipart/form-data"
        onSubmit={onSubmit}
        className={customClasses.settings__form}
      >
        <div className={customClasses.fileContainer}>
          {existingImage ? (
            <img
              src={uploadedImage ? uploadedImage : existingImage.image}
              srcSet={
                uploadedImage
                  ? null
                  : `${existingImage.image.replace(
                      "upload/",
                      "upload/w_300/"
                    )} 300w`
              }
              sizes="300px"
              alt=""
            />
          ) : (
            <InitialProfileImage user={user} size={300} />
          )}

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
        {/* <button type="submit">Submit</button> */}
        <Button type="submit" color="green">
          Submit Image
        </Button>
      </form>
    </>
  );
};

export default connect(null, { addUserImage })(Image);
