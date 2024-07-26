import express from "express";
import {
  deleteCustomer,
  findCustomer,
  postCustomer,
  putCustomer,
} from "../controller/customer.controller.js";
import { protect } from "../middleware/jwt.js";

const route = express.Router();

route.get("/", findCustomer);
route.post("/", postCustomer);
route.put("/:customerId", putCustomer);
route.delete("/:customerId", deleteCustomer);

export default route;
