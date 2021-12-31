const db = require("../models")

module.exports = function(app, cloudinary, upload) {
    app.post("/api/addImage", upload.single("image"), (req, res) => {
        console.log("FILE: ", req.file.path)
        cloudinary.v2.uploader.upload(req.file.path, (err, result) => {
            if (err) {
                req.json(err.message)
            }
            req.body.image = result.secure_url;
            // add image's public_id to the image object
            req.body.imageId = result.public_id;

            db.Image.create(req.body, (err, image) => {
                if (err) {
                    res.json(err.message)
                    return res.redirect("/")
                }
            })
        })
    })
}