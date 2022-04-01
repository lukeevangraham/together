module.exports = (sequelize, DataTypes) => {
  const Following = sequelize.define("Following", {
    followingUserId: DataTypes.BIGINT,
  });

  Following.associate = (models) => {
    Following.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Following;
};
