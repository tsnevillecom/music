const mongoose = require("mongoose");

const EmailTokenSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200
  }
});

const EmailToken = mongoose.model("EmailToken", EmailTokenSchema);
module.exports = EmailToken;
