import express = require("express");
import http = require("http");

export function bootstrap() {
  const app = express();
  app.use(express.static(__dirname));
  const server = http.createServer(app);
  server.listen();
  const address = server.address();
  if (typeof address === "string") {
  } else {
    console.log(`http://localhost:${address.port}`);
  }
}
