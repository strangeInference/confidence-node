var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var contrl = require("./db/controllers");
var pg = require("pg");

var app = express();
var port = process.env.PORT || 8888;
var server = app.listen(port);

app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));

app.set("trust proxy", 1);
app.use(cookieParser());
app.use(session({
  secret: "devSecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: !true
  }
}));

app.get("/predictions", contrl.predictions.get);

app.post("/newPred", contrl.predictions.post);
app.put("/outcome", contrl.predictions.put);

app.post("/signup", contrl.auth.post);
app.put("/login", contrl.auth.put);
app.put("/logout", contrl.auth.logout);

var conString = process.env.DATABASE_URL || 'postgres://localhost:5432/';
console.log(conString);
var client = new pg.Client(conString);
client.connect();

function isLoggedin(req, res, next) {
  if (req.session.userId){
    next();
  } else {
    res.status(401);
  }
}

// app.use(function(req, res, next) {

//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header("Access-Control-Allow-Origin", "http://localhost");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
//require("./auth/passport")(passport);

// app.use(passport.initialize());
// app.use(passport.session());
