var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var AuthRouter = require("./controllers/authController");
var UserRouter = require("./controllers/userController");
var ArticleRouter = require("./controllers/articleController");
var CommonRouter = require("./controllers/CommonController");
var authMethod = require("./libs/AuthMethod");
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/auth/", AuthRouter);
app.use(async function(req, res, next) {
    if (req.headers.sid) {
        let user = await authMethod.get_user(req.headers.sid);
        if (user) {
            authMethod.current_user = user;
            next();
        } else {
            authMethod.current_user = null;
            res.status(401).json({ code: 1, msg: "还未登录，请先登录" });
        }
    } else {
        authMethod.current_user = null;
        res.status(401).json({ code: 1, msg: "还未登录，请先登录" });
    }
});

app.use("/auth/user/", UserRouter);
app.use("/auth/article/", ArticleRouter);
app.use("/common/", CommonRouter);

app.set("port", process.env.PORT || 8080);

var server = app.listen(app.get("port"), function() {
  console.log("Express server listening on port " + server.address().port);
});
