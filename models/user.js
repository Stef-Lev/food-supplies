const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  fullname: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
  passwordCheck: {
    type: String,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords don't match.",
    },
  },
  lists: [{ type: Schema.Types.ObjectId, ref: "List" }],
});

module.exports = mongoose.model("User", UserSchema);
