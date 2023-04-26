import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  imgTittle: {
    type: String,
  },
  contentTittle: {
    type: String,
  },
  releaseDate: {
    type: String,
  },
  view: {
    type: String,
  },
  status: {
    type: String,
  },
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    // type: String,
  },
});
export default mongoose.model("post", postSchema);
