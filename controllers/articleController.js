var express = require("express");
var router = express.Router();
var models = require("../models");
var sequelize = require("../config/db").sequelize();
var authMethod = require("../libs/AuthMethod");

router.use(async function(req, res, next) {
    if (req.headers.sid) {
        let user = await authMethod.get_user(req.headers.sid);
        if (user) {
            next();
        } else {
            res.status(401).json({ code: 1, msg: "还未登录，请先登录" });
        }
    } else {
        res.status(401).json({ code: 1, msg: "还未登录，请先登录" });
    }
});

router.get("/", async function(req, res, next) {
  let user = await authMethod.get_user(req.headers.sid);
  let articles = await models.Articles.findAll({where: {author_id: user.id}});
  let data = {
    "code":0,
    "data": articles,
    "msg": "获取成功"
  };
  res.json(data);
});

router.post("/create",  async function (req, res, next) {
  res.json('create');
});


module.exports = router;
