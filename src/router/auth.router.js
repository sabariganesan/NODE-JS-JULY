import express from "express";
import { register, login } from "../controller/auth.controller.js";

const route = express.Router();

// route.post("/", postUser);
// route.post("/login", login);

route.post("/register", register);
route.post("/login", login);

export default route;
