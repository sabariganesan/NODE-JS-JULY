import express from "express";
import { getSampleUser } from "../controller/vendor.controller.js";

const route = express.Router();

route.get("/", getSampleUser);

export default route;
