import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  username: { type: String, required: true },
  path: { type: String, required: true },
  filename: { type: String, required: true },
  url: { type: String, required: true } // Add this line
});

const imageModel = mongoose.model('images', imageSchema);
//module.exports = imageModel

export default imageModel