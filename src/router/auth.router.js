import express from "express";
import { login, postUser } from "../controller/auth.controller.js";

const route = express.Router();

route.post("/", postUser);
route.post("/login", login);

export default route;
