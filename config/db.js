"use strict";

var config = require("./index");
const Sequelize = require("sequelize");

exports.sequelize = function() {
  return new Sequelize(
    config.sequelize.database,
    config.sequelize.username,
    config.sequelize.password,
    {
      host: config.sequelize.host,
      dialect: config.sequelize.dialect,
      timezone: "Asia/Shanghai",
      operatorsAliases: false,
      logging: console.log,
      define: config.sequelize.define,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );
};
