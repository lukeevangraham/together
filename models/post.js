module.exports = (sequelize, DataTypes) => {
  let Post = sequelize.define("Post", {
    body: DataTypes.TEXT,
    image: DataTypes.STRING,
    imageId: DataTypes.STRING,
  });

  Post.associate = (models) => {
    // A Post should belong to a User
    // A post can't be created without a User due to the foreign key constraint
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Post;
};
