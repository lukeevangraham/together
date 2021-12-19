module.exports = (sequelize, DataTypes) => {
    let Image = sequelize.define("Image", {
        title: DataTypes.STRING,
        image: DataTypes.STRING,
        imageId: DataTypes.STRING,
    })

    return Image
}