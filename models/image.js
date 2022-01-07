module.exports = (sequelize, DataTypes) => {
    let Image = sequelize.define("Image", {
        title: DataTypes.STRING,
        image: DataTypes.STRING,
        imageId: DataTypes.STRING,
        userId: DataTypes.INTEGER
    }, {
        classMethods: {
          associate: function (models) {
            Image.belongsTo(models.User, {
                foreignKey: {
                  allowNull: false
                }
              })
          }
        }
      })

    return Image
}