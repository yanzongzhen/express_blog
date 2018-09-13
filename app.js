var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var AuthRouter = require("./controllers/authController");
var UserRouter = require("./controllers/userController");
var ArticleRouter = require("./controllers/articleController");
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/auth/", AuthRouter);
app.use("/auth/user/", UserRouter);
app.use("/auth/article/", ArticleRouter);

app.set("port", process.env.PORT || 8080);

var server = app.listen(app.get("port"), function() {
  console.log("Express server listening on port " + server.address().port);
});
