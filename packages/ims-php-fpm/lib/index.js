"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const express_php_fpm_1 = require("express-php-fpm");
const root = process.cwd();
const options = {
    documentRoot: path.join(root, 'we7'),
    env: {},
    socketOptions: { port: 9999 },
};
const app = express();
app.use("/", express_php_fpm_1.default(options));
app.listen(3000);
