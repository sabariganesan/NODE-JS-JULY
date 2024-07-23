import express from "express";
import {
  findCustomer,
  postCustomer,
} from "../controller/customer.controller.js";
import { protect } from "../middleware/jwt.js";

const route = express.Router();

route.get("/", findCustomer);
route.post("/", postCustomer);

export default route;
