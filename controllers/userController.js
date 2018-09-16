var express = require("express");
var router = express.Router();
var models = require("../models");
var sequelize = require("../config/db").sequelize();
var authMethod = require("../libs/AuthMethod");

router.get("/info", async function(req, res, next) {
  try {
    let user = await authMethod.get_user(req.headers.sid);
    if (user) {
      return res.json({ code: 0, msg: "获取成功", data: user });
    }
    return res.json({ code: 1, msg: "获取失败" });
  } catch (e) {
    console.log(e);
  }
});

router.get("/logout", function(req, res, next) {
  let res_status = authMethod.logout(req.headers.sid);
  if (res_status) {
    return res.json({
      code: 0,
      msg: "登出成功"
    });
  } else {
    return res.json({
      code: 1,
      msg: "登出失败"
    });
  }
});

router.post("/modify", async function(req, res, next) {
  try {
    let user = await authMethod.get_user(req.headers.sid);
    if (user.phone != null || user.phone !== "") {
      user.phone = req.body.phone;
    }
    user.nickName = req.body.nickName;
    user.gender = req.body.gender;
    user.avatarUrl = req.body.avatarUrl;
    user.is_click = req.body.is_click;
    user.save();
    return res.json({
      code: 0,
      msg: "信息修改成功"
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
