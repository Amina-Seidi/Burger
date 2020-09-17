const express = require("express");
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 3000;

// Import routes and give the server access to them.
const routes = require("./controllers/burgersController.js");



// Create an instance of the express app.
const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

//Parse the request as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set handlebars

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(routes);

app.listen(PORT, function() {
  console.log("Server is now listening on PORT:" + PORT);
});
