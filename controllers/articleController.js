var express = require("express");
var router = express.Router();
var models = require("../models");
var sequelize = require("../config/db").sequelize();
var authMethod = require("../libs/AuthMethod");

router.get("/", async function(req, res, next) {
  let articles = await models.Articles.findAll({
          where: {
            author_id: authMethod.current_user.id,
            deletedAt: null
          },
          include: [models.PostStatus]
  });
  let data = {
    "code":0,
    "data": articles,
    "msg": "获取成功"
  };
  res.json(data);
});

router.post("/create",  async function (req, res, next) {
  const saveArticle = {
    title: req.body.title,
    desc: req.body.desc,
    content:  req.body.content,
    tags: req.body.tags,
    post_status: req.body.post_status,
    author_id:  authMethod.current_user.id
  };
  return sequelize.transaction(t=> {
    return models.Articles.create(saveArticle ,{transaction: t}).then(result =>{
      const res_data = {
        "code": 0,
        "msg": "文章发布成功",
        "article_id": result.id
      };
      return res.json(res_data);
    }).catch(e=>{
      console.log(e);
    });
  });
});

router.get("/delete",  async function (req, res, next) {
    const article_id = req.query.id;
    return sequelize.transaction(t=> {
           return models.Articles.destroy({where: {id: article_id},transaction: t}).then(async ()=>{
             let rs = await models.Comments.destroy({where: {article_id: article_id}});
             let res_data = {
                 "code":0,
                 "msg": "删除成功",
                 "data": rs
             };
             return res.json(res_data);
           }).catch(e=>{
               console.log(e);
           });
    });
});



module.exports = router;
