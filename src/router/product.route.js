import express from "express";
import { addProduct,findAllProduct } from "../controller/product.controller.js";

const route = express.Router();


route.post("/",addProduct)
route.get("/",findAllProduct)

export default route;
