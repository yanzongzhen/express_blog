module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      session: {
        type: DataTypes.STRING(128),
        allowNull: true
      },
      is_superuser: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      phone: {
        type: DataTypes.STRING(13),
        allowNull: true
      },
      avatarUrl: {
        type: DataTypes.STRING(240),
        allowNull: true
      },
      is_click: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
      },
      gender: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      nickName: {
        type: DataTypes.STRING(128),
        allowNull: true
      }
    },
    {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: "user",
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );

  return User;
};
