const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
  lists: [
    {
      id: String,
      listName: String,
      items: [
        {
          product: { type: Schema.Types.ObjectId, ref: "Product" },
          added: {
            type: Date,
            default: new Date(),
          },
          expires: {
            type: Date,
            default: new Date(),
          },
        },
      ],
    },
  ],
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordCheck = undefined;
  next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("User", UserSchema);
