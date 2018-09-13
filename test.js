var models = require("./models");
var sequelize = require("./config/db").sequelize();

var User = models.User;
var Articles = models.Articles;
var Comments = models.Comments;
var PostStatus = models.PostStatus;
var Tags = models.Tags;

const TestUnit = async function() {
    let res = await sequelize.query('SELECT * FROM articles index by article_userId where author_id = 1', {
        type: sequelize.QueryTypes.SELECT
    });
    console.log(res);
};

TestUnit();
