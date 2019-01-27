"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = require("webpack");
class HelloWorldPlugin extends webpack_1.Plugin {
    apply(compiler) {
        compiler.plugin("done", function () {
            console.log("Hello World!");
        });
    }
}
exports.HelloWorldPlugin = HelloWorldPlugin;
//# sourceMappingURL=hello_world.js.map