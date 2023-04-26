import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
  imgEvent: {
    type: String,
  },
  contentEvent: {
    type: String,
  },
  money: {
    type: String,
  },
  usedDate: {
    type: String,
  },
  status: {
    type: String,
  },
  userID: {
    type: String,
  },
});
export default mongoose.model("payment", paymentSchema);
