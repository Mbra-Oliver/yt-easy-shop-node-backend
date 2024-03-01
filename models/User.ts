import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    requred: true,
  },
});

module.exports = mongoose.model("User", userSchema);
