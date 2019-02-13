"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_fs_level_1 = require("ims-fs-level");
const path_1 = require("path");
async function bootstrap() {
    const fs = new ims_fs_level_1.ImsFsLevel(path_1.join(__dirname, "data"));
    let res = await fs.get("demo").then(res => res.toString());
    debugger;
}
bootstrap();
