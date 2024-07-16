const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const indexedRoute = require("./routes/routes");

const connectDB = require("./config/conectDb");
require("dotenv").config();

const app = express();
app.use(cors());
const port = process.env.PORT;
const dbURL = process.env.DATABASE_URL;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/api", indexedRoute);

app.get("/", (req, res) => {
  res.send("hello mr");
});

connectDB(dbURL);

app.listen(port, () => {
  console.log("running");
});
