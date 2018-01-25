var db = require("./db");
var bcrypt = require("bcrypt");

module.exports = {
  predictions: {
    get: function(req, res) {
      db.Pred.findAll({where: {userId: req.session.userId}}).then(function(preds) {
        res.json(preds);
      });
    },

    post: function(req, res) {
      //console.log("req.body.prediction: ", req.body.prediction);
      db.Pred.create({
        prediction: req.body.prediction,
        prob: req.body.prob,
        date_known: req.body.dateKnown,
        is_public: req.body.isPublic,
        outcome: null,
        userId: req.session.userId,
      }).then(function(pred) {
        console.log("pred data: ", pred);
        res.json(pred)
      });
    },

    put: function(req, res) {
      console.log("req.body: ", req.body);
      db.Pred.update({outcome: req.body.outcome}, {where: {id: req.body.id}});
      //need to send back updated prediction
    }
  },

  auth: {
    post: function(req, res) {
      console.log("trying to create user");
      var username = req.body.username;
      var password = req.body.password;

      bcrypt.hash(password, 10, function(err, hash) {
        console.log("trying to hash: ", hash);
        db.User.create({
          user_name: username,
          password: hash
        });
      });
      res.status(200).json({valid: true});
    },

    put: function(req, res) {
      console.log("trying to login");
      console.log("req: ", req.session);
      var username = req.body.username;
      var password = req.body.password;

      db.User.findOne({where: {
        user_name: username
      }}).then(function(user) {
        console.log(user.get("password"));
        bcrypt.compare(password, user.get("password"), function(err, match) {
          if (match) {
            console.log("password is valid");
            req.session.userId = user.get("id");
            res.status(200).json({valid: match});
          } else {
            console.log("ivalid password");
            res.send("invalid")
          }
        });
      }).catch(function(){
        console.log("user does not exist");
      });

      
    }
  }
}
