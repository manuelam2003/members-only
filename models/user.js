const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, minLength: 3, maxLength: 100 },
  last_name: { type: String, required: true, minLength: 3, maxLength: 100 },
  username: { type: String, required: true, minLength: 3, maxLength: 100 },
  password: { type: String, required: true },
  membership_status: {
    type: Boolean,
    default: false,
  },
  is_admin: { type: Boolean, default: false },
});

UserSchema.virtual("url").get(function () {
  return `/catalog/users/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);
