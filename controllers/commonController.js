var express = require("express");
var router = express.Router();
var models = require("../models");
var sequelize = require("../config/db").sequelize();
var authMethod = require("../libs/AuthMethod");

router.use(function (req, res, next) {
   console.log("*********CommonRequest***********");
   next();
});


router.get("/articles", async function(req, res, next) {
   let result = await models.Articles.findAll(
       {
           where:{deletedAt: null},
           include: [{model: models.Comments, includes:[models.User]}]
       }
   );
   return res.json(result);
});

router.get("/article", async function(req, res, next) {
    let article_id = req.query.id;
    let result = await models.Articles.findOne({
        where: {id: article_id,deletedAt: null},
        include: [{model: models.Comments, includes:[models.User]}]
    });
    return res.json(result);
});

router.get("/post_status", async function (req, res, next) {
    let result = await models.PostStatus.findAll();
    return res.json(result);
});


module.exports = router;
