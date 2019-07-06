let cors = require("cors");
let mongoose = require("mongoose");
let apiRoutes = require("./routes/api-routes");
let express = require("express");
let bodyParser = require("body-parser");
let auth = require("./auth");
let jwt = require("jsonwebtoken");
let User = require("./model/user");

/*
Credit for HandleGenerator:
Naren Yellavula
https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4
*/
class HandlerGenerator {
  login(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
      User.findOne({ username: username }, function(err, user) {
        if (err) {
          res.status(403);
          res.json({
            success: false,
            message: "Incorrect username or password"
          });
        }
        let dbUsername = user.username;
        let dbPassword = user.password;
        if (username === dbUsername && password === dbPassword) {
          let token = jwt.sign({ username: username }, "replace", {
            expiresIn: "24h" // expires in 24 hours
          });
          // return the JWT token for the future API calls
          res.json({
            success: true,
            message: "Authentication successful!",
            token: token
          });
        } else {
          res.status(403);
          res.json({
            success: false,
            message: "Incorrect username or password"
          });
        }
      });
    } else {
      res.status(400);
      res.json({
        success: false,
        message: "Authentication failed! Please check the request"
      });
    }
  }
  index(req, res) {
    res.json({
      success: true,
      message: "Index page"
    });
  }
}

function main() {
  let handlers = new HandlerGenerator();
  let app = express();
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());
  app.use(cors());
  //server
  var port = 8080;
  app.post("/login", handlers.login);
  app.use("/api", auth.checkToken, apiRoutes);
  app.listen(port, function() {
    console.log("Running PortalAPI on port " + port);
  });
}

//mongoose
mongoose.connect("mongodb://localhost/portaldb", { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected!");
});

main();
