"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("./module");
const tokens_1 = require("./tokens");
async function bootstrapModule(type) {
    try {
        let moduleRef = await module_1.ModuleFactory.create(type);
        let appInits = await moduleRef.injector.get(tokens_1.AppInitialization);
        if (Array.isArray(appInits)) {
            for (let init of appInits) {
                if (Array.isArray(init)) {
                    throw new Error(`app initialization 不支持多级嵌套`);
                }
                else {
                    if (typeof init === "function") {
                        await init(moduleRef.injector);
                    }
                }
            }
        }
        return moduleRef;
    }
    catch (e) {
        throw e;
    }
}
exports.bootstrapModule = bootstrapModule;
//# sourceMappingURL=bootstrap.js.map