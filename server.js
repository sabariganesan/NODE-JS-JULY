import express from "express";
import UserRouter from "./src/router/user.router.js";
import CustomerRouter from "./src/router/customer.route.js";
import AuthRouter from "./src/router/auth.router.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json()); // for decode the json payload
app.use(
  cors({
    origin: "*",
  })
);

app.use("/user", UserRouter);
app.use("/customer", CustomerRouter);
app.use("/auth", AuthRouter);

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
