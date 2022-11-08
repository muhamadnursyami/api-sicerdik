const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customSchema = Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    minLength: 6,
  },
  nip: {
    type: String,
    maxLength: 50,
  },
  tempatkerja: {
    type: String,
    maxLength: 100,
  },
  jabatan: {
    type: String,
    maxLength: 50,
  },
});

const Register = mongoose.model("register", customSchema);
module.exports = { Register };
