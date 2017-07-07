var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 8888;
var server = app.listen(port);

app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());

app.get("/predictions", function(req, res) {
  res.send([{prediction: "this will work", prob: 40, outcome: false, pending: false}, 
                    {prediction: "this wont't work", prob: 60, outcome: true, pending: false},
                    {prediction: "this will be pending", prob: 76, outcome: true, pending: true}]);
  console.log("sending predictions");
});

app.post("/newPred", function(req, res) {

});
