import React, { useState } from "react";
import { connect } from "react-redux";
import { addImage } from "../../../../store/actions";

const Image = ({ addImage }) => {
    let [image, setImage] = useState("")

    const onChangeImage = e => {
        setImage(e.target.files[0])
    }

    const onSubmit = e => {
        e.preventDefault();

        // console.log("SUBMITTED: ", image)
        addImage(image)
        setImage("");
    }

    return (
        <div>
            <input type="file" onChange={onChangeImage} />
            <button type="submit" onClick={onSubmit}>Submit</button>
        </div>
    )
}

export default connect(null, { addImage })(Image);