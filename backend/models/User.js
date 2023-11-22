const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, minLength: 3, maxLength: 100, unique: true},
    password: { type: String, required: true, minLength: 8 },
    status: {
      type: String,
      required: true,
      enum: ["Basic", "Admin"],
      default: "Basic",
    },
  });


// Export model
module.exports = mongoose.model("User", UserSchema);