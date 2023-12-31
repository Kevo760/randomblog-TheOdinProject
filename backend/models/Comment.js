const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    commenterid: { type: String, required: true },
    username: { type: String, required: true},
    message: { type: String, required: true, minLength: 3, maxLength: 100},
    postid: { type: String, required: true},
  }, { timestamps: true });


// Export model
module.exports = mongoose.model("Comment", CommentSchema);