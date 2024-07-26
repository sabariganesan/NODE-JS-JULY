import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
    enum: ["electronics", "men", "women", "baby"],
  },
  price: {
    type: Number,
    require: true,
  },
  desc: String,
});

const Product = mongoose.model("product", productSchema);

export default Product;
