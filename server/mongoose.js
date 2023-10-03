const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const URL_PARSER = new Schema({
  longurl: {
    type: String,
    required: true,
  },
  shorturl: {
    type: String,
    required: true,
  },
});

const url_parser = mongoose.model("url_parser", URL_PARSER);

module.exports = url_parser;
