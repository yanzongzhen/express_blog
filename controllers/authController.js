var express = require("express");
var router = express.Router();
var models = require("../models");
var sequelize = require("../config/db").sequelize();
var authMethod = require("../libs/AuthMethod");
const User = models.User;


router.use(function(req, res, next) {
  console.log("*******" + req.method + "********");
  next();
});

router.post("/login", async function(req, res, next) {
  var user = {
    username: req.body.username,
    password: req.body.password
  };
  var _res = await authMethod.login(user.username, user.password);
  return res.json(_res);
});

router.post("/register", function(req, res, next) {
  if (req.body.password != req.body.re_password) {
    return res.json({
      code: 1,
      msg: "两次密码不一致"
    });
  } else {
    var saveuser = {
      username: req.body.username,
      password: authMethod.gen_password(req.body.password),
      phone: req.body.phone,
      session: authMethod.set_session(req.body.username)
    };
    return sequelize.transaction(t => {
      return User.create(saveuser, { transaction: t }).then(result => {
        var res_data = {
          code: 0,
          msg: "注册成功",
          sid: result.session
        };
        return res.json(res_data);
      });
    });
  }
});

module.exports = router;
