const express = require("express");
const { mongoose } = require("mongoose");
const url_parser = require("./mongoose.js");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());
const url = process.env.db;

app.use(express.json());

app.get("/", (req, res) => {
  try {
    mongoose.connect(url).then(() => console.log("Connection Successful"));
    res.status(200);
  } catch {
    (error) => console.log(error);
  }
});

app.get("/find", async (req, res) => {
  const ans = await url_parser.find();
  res.status(200).json(ans);
});

app.post("/create", async (req, res) => {
  const { longurl } = req.body;
  let shorturl = "";
  for (let i = 0; i < 5; i++) {
    shorturl += longurl[Math.floor(Math.random() * longurl.length)];
  }
  try {
    const createnew = await url_parser.create({ longurl, shorturl });
    res.status(200).json(createnew);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/find", async (req, res) => {
  var keyword = req.body;
  const searchterm = keyword.shorturl;
  try {
    const answer = await url_parser.find({ shorturl: searchterm });
    res.status(200).json(answer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3001, (req, res) => {
  console.log("Listening on port 3001");
});
