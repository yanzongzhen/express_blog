module.exports = function(sequelize, DataTypes) {
  const PostStatus = sequelize.define(
    "PostStatus",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(128), allowNull: false },
      position: { type: DataTypes.INTEGER }
    },
    {
      timestamps: false,
      underscored: true,
      freezeTableName: true,
      tableName: "postStatus",
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );
  return PostStatus;
};
