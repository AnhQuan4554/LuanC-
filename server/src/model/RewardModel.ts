import mongoose from "mongoose";
const rewardSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  imgVocher: {
    type: String,
  },
  contentVocher: {
    type: String,
  },
  expiredDate: {
    type: String,
  },
  activeDate: {
    type: String,
  },
  status: {
    type: String,
  },
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
});
export default mongoose.model("reward", rewardSchema);
