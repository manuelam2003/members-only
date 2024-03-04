const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, minLength: 3, maxLength: 100 },
  timestamp: { type: Date, default: Date.now },
  text: { type: String, required: true, minLength: 3, maxLength: 100 },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

MessageSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/messages/${this._id}`;
});

module.exports = mongoose.model("Message", MessageSchema);
