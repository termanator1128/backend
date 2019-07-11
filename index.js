let cors = require("cors");
let mongoose = require("mongoose");
let apiRoutes = require("./routes/api-routes");
let express = require("express");
let bodyParser = require("body-parser");
let auth = require("./auth");

function main() {
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
  app.use("/api", auth.checkToken, apiRoutes);
  app.use(function(err, req, res, next) {
    res.json({
      success: false,
      message: err
    });
  });
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
