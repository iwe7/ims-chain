"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImsWebpackHashAllModulesPlugin {
    constructor(injector) {
        this.injector = injector;
    }
    apply(compiler) {
        compiler.hooks.emit.tap("HashAllModulesPlugin", compilation => {
            console.log({ compilation });
            return compilation;
        });
    }
}
exports.ImsWebpackHashAllModulesPlugin = ImsWebpackHashAllModulesPlugin;
//# sourceMappingURL=hash_module.js.map