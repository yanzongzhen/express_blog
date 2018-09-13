"use strict";

var all = {
  sequelize: {
    username: "root",
    password: "127521yzz",
    database: "express",
    host: "localhost",
    dialect: "mysql",
    define: {
      underscored: false,
      timestamps: true,
      paranoid: true
    }
  },
  session_expired: 60 * 10,
  secret_key: "qhdhiosanioy9q829i10qsq"
};

module.exports = all;
