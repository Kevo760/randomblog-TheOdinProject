const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DraftPostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, minLength: 3, maxLength: 100 },
    body: { type: String, required: true, minLength: 3},
  }, { timestamps: true });



// Export model
module.exports = mongoose.model("Post", DraftPostSchema);