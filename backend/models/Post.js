const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, minLength: 3, maxLength: 100 },
    body: { type: String, required: true, minLength: 3},
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment"}],
  }, { timestamps: true });

// Export model
module.exports = mongoose.model("Post", PostSchema);