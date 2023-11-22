const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    username: { type: String, minLength: 3, maxLength: 100},
    message: { type: String, required: true, minLength: 3, maxLength: 100},
  }, { timestamps: true });


// Export model
module.exports = mongoose.model("Comment", CommentSchema);