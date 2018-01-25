var Sequelize = require("sequelize");
var dbAuth = require("../auth/auth.js").psqlAuth;

var db;

if (process.env.PORT) {

} else {
  db = new Sequelize(dbAuth.database, dbAuth.username, dbAuth.password, dbAuth.host); 
}

var User = db.define("users", {
  user_name: Sequelize.STRING,
  password: Sequelize.STRING,
  google_id: Sequelize.STRING,
  google_token: Sequelize.STRING,
  google_name: Sequelize.STRING
});

var Pred = db.define("preds", {
  prediction: Sequelize.TEXT,
  prob: Sequelize.FLOAT,
  date_known: Sequelize.DATE,
  is_public: Sequelize.BOOLEAN,
  outcome: Sequelize.BOOLEAN,
});

User.hasMany(Pred);

db.sync();

module.exports = {
  Pred: Pred,
  User: User
}
