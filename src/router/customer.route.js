import express from "express";
import {
  findCustomer,
  postCustomer,
} from "../controller/customer.controller.js";
import { protect } from "../middleware/jwt.js";

const route = express.Router();

route.get("/", protect, findCustomer);
route.post("/", protect, postCustomer);

export default route;
