const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  drawnData: {
    type: Schema.Types.Mixed,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  videoLink: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Video", VideoSchema);
