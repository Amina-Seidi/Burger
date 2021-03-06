const express = require("express");
const router = express.Router();
// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
	burger.all(function(data) {
		var hbsObject = {
			burgers: data
		};
		console.log(hbsObject);
		res.render("index", hbsObject);
	});
});

// add a '/burgers endpoint that posts the 
// burger name the user entered then as a callback it
// redirects back to the /index route
router.post("/api/burgers", function(req, res) {
	burger.create(["burger_name", "devoured"], [req.body.name, req.body.devoured], function(result) {
		res.json({ id: result.insertId});
	});
});


// the status of the burger from being uneaten to eaten
// then does a callback that redirects to the /index endpoint
router.put("/api/burgers/:id", function(req, res) {
	var condition = "id = " + req.params.id;
	
	console.log("condition", condition);

	burger.update(
		{
			devoured: req.body.devoured
		}, 
		condition, 
		function(result) {
			if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }

			res.status(200).end;

		}
	);
});

// export the router (controller) back to the server
module.exports = router;
