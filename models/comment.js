module.exports = function(sequelize, DataTypes) {
  const Comments = sequelize.define(
    "Comments",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      remind: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      article_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "文章Id"
      }
    },
    {
      underscore: true,
      freezeTableName: true,
      tableName: "comments",
      comment: "评论表",
      charset: "utf8",
      collate: "utf8_general_ci",
      indexes: [
        {
          name: "comment_articleId",
          method: "BTREE",
          fields: ["article_id"]
        }
      ]
    }
  );
  return Comments;
};
