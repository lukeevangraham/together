module.exports = (sequelize, DataTypes) => {
  let Image = sequelize.define("Image", {
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    imageId: DataTypes.STRING,
  });

  // Image.associate = (models) => {
  //   Image.belongsTo(models.User, {
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   });
  // };

  return Image;
};
