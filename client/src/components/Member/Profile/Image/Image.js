import React, { useState } from "react";
import { connect } from "react-redux";
import { addImage } from "../../../../store/actions";

const Image = ({ addImage, userId }) => {
    let [image, setImage] = useState("")

    const onChangeImage = e => {
        setImage(e.target.files[0])
    }

    const onSubmit = e => {
        e.preventDefault();

        // console.log("SUBMITTED: ", image)
        let formData = new FormData()
        formData.append("image", image)
        formData.append("userId", userId)
        // formData.append("text: ", "hello")
        // for (var value of formData.values()) {
        //     console.log(value)
        // }
        addImage(formData)
        setImage("");
    }

    return (
        <form encType="multipart/form-data" onSubmit={onSubmit}>
            <input type="file" name="image" onChange={onChangeImage} />
            <button type="submit">Submit</button>
        </form>
    )
}

export default connect(null, { addImage })(Image);