let express = require("express");
let app = express();
let bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
var cors = require("cors");
app.use(cors());
let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/resthub", { useNewUrlParser: true });

let apiRoutes = require("./routes/api-routes");

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected!");
});

var port = 8080;
app.use("/api", apiRoutes);
app.listen(port, function() {
  console.log("Running RestHub on port " + port);
});
