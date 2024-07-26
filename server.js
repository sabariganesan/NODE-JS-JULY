import express from "express";
import UserRouter from "./src/router/user.router.js";
import CustomerRouter from "./src/router/customer.route.js";
import AuthRouter from "./src/router/auth.router.js";
import VendorRouter from "./src/router/vendor.route.js";
import productRouter from "./src/router/product.route.js";
import wishlistRouter from "./src/router/wishlist.route.js";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => {
    console.log("Mongoose Connected");
  })
  .catch((err) => {
    console.log("Mongoose Connection failed", err);
  });

app.use(express.json()); // for decode the json payload
app.use(
  cors({
    origin: "*",
  })
);

app.use("/user", UserRouter);
app.use("/customer", CustomerRouter);
app.use("/auth", AuthRouter);
app.use("/vendor", VendorRouter);
app.use("/product", productRouter);
app.use("/wishlist", wishlistRouter);

// request
// 1.query params
// 2.params
// 3.body
// 4.headers

app.get("/", (request, response) => {
  response.status(200).send("Success");
});

// app.post("/api", (request, response) => {
//   const { body } = request;
//   // request.query => user query params
//   // request.header => request headers

//   response.status(200).send(body);
// });

// app.get("/api/user/:id", (request, response) => {
//   const { id } = request.params;
//   response.status(200).send(`user id = ${id}`);
// });

app.listen(process.env.PORT, (err) => {
  if (err) console.error(err);
  console.log(`server listening in port ${process.env.PORT}`);
});

// import http from "http";  // build in module

// http
//   .createServer((request, response) => {
//     if (request.url === "/api" && request.method === "GET") {
//       response.write("<h1>Welcome</h1>");
//     } else {
//       response.write("<h1>Hello world</h1>");
//     }
//     response.end();
//   })
//   .listen(8000);
