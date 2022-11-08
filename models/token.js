const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = Schema({
  token: {
    type: String,
    required: true,
  },
  _registerId: {
    type: Schema.Types.ObjectId,
    ref: "register",
  },
  tokenType: {
    type: String,
    enum: ["login", "resetPassword"],
  },
});

const Token = mongoose.model("tokens", tokenSchema);
module.exports = { Token };
