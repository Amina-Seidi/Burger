const orm = require("../config/orm.js");

const burger = {
	// all for getting all the burgers
  all: function(cb) {
		orm.all("burgers", function(res) {
			cb(res);
		});
	},
	// insert burger for adding a new burger
	create: function(cols, vals, cb) {
		orm.create("burgers", cols, vals, function(res) {
			cb(res);
		});
	},
	// update for changing the burger status
	update: function(objColVals, condition, cb) {
		orm.update("burgers", objColVals, condition, function(res) {
			cb(res);
		});
	}
};

// export burger back to the controller
module.exports = burger;
