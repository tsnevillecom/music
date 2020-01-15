const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

import { SECRET } from "../config";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid!");
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error("Please enter your password!");
      } else if (validator.equals(value.toLowerCase(), "password")) {
        throw new Error("Password is invalid!");
      } else if (validator.contains(value.toLowerCase(), "password")) {
        throw new Error("Password should not contain password!");
      }
    }
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  roles: [
    {
      type: "String"
    }
  ],
  passwordResetToken: String,
  passwordResetExpires: Date
});

UserSchema.statics.checkValidCredentials = async function(userName, password) {
  const user = await User.findOne({ userName });

  if (!user) {
    throw new Error("Unable to login.");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login.");
  }

  return user;
};

UserSchema.methods.newAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user.id.toString() }, SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

UserSchema.methods.toJSON = function() {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.tokens;
  return userObj;
};

//hash the plain text password before saving
UserSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// UserSchema.pre('remove', async function(next){
//     const user = this
//     await Post.deleteMany({author: user._id})
//     next()
// })

const User = mongoose.model("User", UserSchema);
module.exports = User;
