module.exports = function(sequelize, DataTypes) {
  const Tags = sequelize.define(
    "Tags",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(128), allowNull: false },
      frequency: { type: DataTypes.INTEGER }
    },
    {
      timestamps: false,
      underscored: true,
      freezeTableName: true,
      tableName: "tags",
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );
  return Tags;
};
