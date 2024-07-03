const http = require("http");

http
  .createServer((request, response) => {
    if (request.url === "/api" && request.method === "GET") {
      response.write("<h1>Welcome</h1>");
    } else {
      response.write("<h1>Hello world</h1>");
    }
    response.end();
  })
  .listen(8000);
