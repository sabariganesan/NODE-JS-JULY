import express from "express";
import {
  addWishlist,
  findWishlist,
} from "../controller/wishlist.controller.js";

const route = express.Router();

route.post("/", addWishlist);
route.get("/:userId", findWishlist);

export default route;
