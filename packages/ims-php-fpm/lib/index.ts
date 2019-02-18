import express = require("express")
import path = require("path")

import epf from "express-php-fpm";
const root = process.cwd();
const options = {
    documentRoot: path.join(root, 'we7'),
    env: {},
    socketOptions: { port: 9999 },
}
const app = express()
app.use("/", epf(options))
app.listen(3000);
