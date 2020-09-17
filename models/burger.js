const orm = require("../config/orm.js");

const burgers = {
	// all for getting all the burgers
  all: function(cb) {
		orm.all("burgers", function(res) {
			cb(res);
		});
	},
	// insert burger for adding a new burger
	insertBurger: function(cols, vals, cb) {
		orm.insertOne("burgers", cols, vals, function(res) {
			cb(res);
		});
	},
	// update for changing the burger status
	updateBurger: function(objColVals, condition, cb) {
		orm.updateOne("burgers", objColVals, condition, function(res) {
			cb(res);
		});
	}
};

// export burger back to the controller
module.exports = burgers;
