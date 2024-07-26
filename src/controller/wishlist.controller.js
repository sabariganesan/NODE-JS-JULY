import { ObjectId } from "mongodb";
import Wishlist from "../modal/wishlist.modal.js";

export const addWishlist = async (request, response) => {
  try {
    const { userId, productId } = request.body;
    const wishlist = new Wishlist({
      userId,
      productId,
    });
    await wishlist.save();
    response.status(200).json({ message: "wishlist Added" });
  } catch (error) {
    response.status(500).json({ message: "Internal server error", error });
  }
};

export const findWishlist = async (request, response) => {
  try {
    const { userId } = request.params;

    const wishlist = await Wishlist.aggregate([
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $project: {
          userId: 0,
          productId: 0,
        },
      },
    ]);

    response.status(200).json({ message: "wishlist Added", data: wishlist });
  } catch (error) {
    response.status(500).json({ message: "Internal server error", error });
  }
};
