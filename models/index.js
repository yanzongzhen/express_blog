"use strict";
var sequelize = require("../config/db").sequelize();
var User = sequelize.import("./user.js");
var Articles = sequelize.import("./article.js");
var Comments = sequelize.import("./comment.js");
var PostStatus = sequelize.import("./poststatus.js");
var Tags = sequelize.import("./tag.js");

// 建立模型之间的关系
User.hasMany(Articles, {
  foreignKey: "author_id",
  targetKey: "id"
});
Articles.hasMany(Comments, {
  foreignKey: "article_id",
  targetKey: "id"
});
Articles.belongsTo(PostStatus,{
  foreignKey: 'post_status',
  targetKey: 'id'
});
Articles.belongsTo(Tags, {
  foreignKey: 'tags',
  targetKey: 'id'
});

// 同步模型到数据库中
// sequelize.sync();
// sequelize.drop({force: true});

exports.User = User;
exports.Articles = Articles;
exports.Comments = Comments;
exports.PostStatus = PostStatus;
exports.Tags = Tags;
