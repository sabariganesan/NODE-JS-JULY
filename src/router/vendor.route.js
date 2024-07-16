import express from "express";
import {
  createVendor,
  findVendor,
  updateVendor,
} from "../controller/vendor.controller.js";

const route = express.Router();

// route.get("/", getSampleUser);

route.post("/", createVendor);
route.get("/", findVendor);
route.put("/:userId", updateVendor);

export default route;
