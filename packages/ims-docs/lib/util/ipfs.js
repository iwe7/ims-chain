"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ipfsClient = require("ipfs-http-client");
exports.ipfs = ipfsClient("/ip4/127.0.0.1/tcp/5001");
