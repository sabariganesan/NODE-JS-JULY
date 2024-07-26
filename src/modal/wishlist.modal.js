import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    require: true,
    ref: "users",
  },
  productId: {
    type: ObjectId,
    require: true,
    ref: "products",
  },
});

const Wishlist = mongoose.model("wishlist", wishlistSchema);

export default Wishlist;
