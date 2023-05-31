const express = require("express");
const routes = require('./app/routes');
const cors = require("cors");

const app = express();

const db = require("./database/models");


// var corsOptions = {
//   origin: "http://localhost:8081"
// };
// parse requests of content-type - application/json
app.use(express.json());
app.use(cors());
app.use('/api', routes);



// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to garimax application." });
 
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});