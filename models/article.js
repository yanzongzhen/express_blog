module.exports = function(sequelize, DataTypes) {
  const Articles = sequelize.define(
    "Articles",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      desc: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      tags: {
        type: DataTypes.STRING(255)
      },
      post_status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "作者Id"
      }
    },
    {
      underscore: true,
      freezeTableName: true,
      tableName: "articles",
      comment: "文章表",
      charset: "utf8",
      collate: "utf8_general_ci",
      indexes: [
        {
          name: "article_userId",
          method: "BTREE",
          fields: ["author_id"]
        }
      ]
    }
  );
  return Articles;
};
