const db = require("../models")

module.exports = function (app, cloudinary, upload) {
    app.post("/api/addImage", upload.single("image"), (req, res) => {
        console.log("FILE: ", req.file.path)
        // console.log("MORE: ", req.body.userId)
        cloudinary.v2.uploader.upload(req.file.path, (err, result) => {
            if (err) {
                req.json(err.message)
            }

            const newImageObject = {
                image:result.secure_url,
                imageId: result.public_id,
                userId: req.body.userId
            }
            req.body.image = result.secure_url;
            // add image's public_id to the image object
            req.body.imageId = result.public_id;

            console.log("NEW IMG: ", newImageObject)

            db.Image.create(newImageObject, (err, image) => {
                if (err) {
                    res.json(err.message)
                    return res.redirect("/")
                }
            })
        })
    })
}