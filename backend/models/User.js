const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const validator = require('validator');

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

// Static signup method

// In order for this keyword regular function expression must be used
UserSchema.statics.signup = async function(username, password) {
  if(!username || !password) {
    throw Error('All fields must be filled')
  }

  if(!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const doesUserExist = await this.findOne({ username });

  if(doesUserExist) {
    throw Error('Username already exists')
  }

  const hashIt = await bcrypt.hash(password, 10);

  const user = await this.create({ username, password: hashIt})

  return user
}

// In order for this keyword regular function expression must be used
UserSchema.statics.login = async function(username, password) {

  if(!username || !password) {
    throw Error('All fields must be filled')
  };

  const user = await this.findOne({ username });

  if(!user) {
    throw Error('Invalid username or password')
  }

  const match = await bcrypt.compare(password, user.password)

  if(!match) {
    throw Error('Invalid username or password')
  }

  return user
}


// Export model
module.exports = mongoose.model("User", UserSchema);