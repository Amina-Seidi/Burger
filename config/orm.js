var connection = require("../config/connection.js");

function printQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push('?');
	}

	return arr.toString();
}

// another function for building queries
function objToSql(ob) {
	var arr = [];

	for (var key in ob) {
		var value = ob[key];
		if (Object.hasOwnProperty.call(ob, key)) {
			if (typeof value === "string" && value.indexOf(" ") >= 0){
        value = "'" + value + "'";
			}
			arr.push(key + '=' + ob[key]);
		}
	}

	return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
	all: function(tableInput, cb) {
		var queryString = "SELECT * FROM " + tableInput + ';';
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			// send the query result back to the callback function
			cb(result);
		});
	},
	// create function for inserting one burger into table
  create: function(table, cols, vals, cb) {
		var queryString = "INSERT INTO " + table;

		queryString += "(";
		queryString += cols.toString();
		queryString += ")";
		queryString += "VALUES (";
		// queryString += vals[0] + ' , ' + vals[1];
		queryString += printQuestionMarks(vals.length);
		queryString += ")";

		console.log(queryString);
		console.log(vals);

		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
			}
			// send the query result back to the callback function
			cb(result);
		});
	},

	// update one function for changing a burger status
	update: function(table, objColVals, condition, cb){
		var queryString = "UPDATE" + table;

		queryString +=  " SET " ;
		queryString += objToSql(objColVals);
		queryString +=  " WHERE ";
		queryString += condition;

		console.log(queryString);

		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			// send the query result back to the callback function
			cb(result);
		});
	},
	delete: function(table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

// export the orm back to the model burger.js
module.exports = orm;
