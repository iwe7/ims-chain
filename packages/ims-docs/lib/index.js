"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
function bootstrap() {
    const app = express();
    app.use(express.static(__dirname));
    const server = http.createServer(app);
    server.listen();
    const address = server.address();
    if (typeof address === "string") {
    }
    else {
        console.log(`http://localhost:${address.port}`);
    }
}
exports.bootstrap = bootstrap;
