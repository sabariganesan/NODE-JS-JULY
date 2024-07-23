import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  year: {
    type: Number,
    require: true,
  },
  tags: {
    type: [String],
  },
  info: {
    email: String,
    place: {
      type: String,
      enum: ["Chennai", "Bangaloor"],
    },
  },
});

const Customer = mongoose.model("customer", customerSchema);
export default Customer;
