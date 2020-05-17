require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;
const db = require("./db/connection");
const routes = require("./routes/video-router");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error: "));

app.get("/", async (req, res) => {
  res.send("Hello World");
});

app.post("/insertData", routes.insertData);
app.get("/getData", routes.getData);
app.get("/deleteAllData", routes.deleteAllData); // To be removed in production

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
