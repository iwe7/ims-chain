"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
const ims_core_1 = require("ims-core");
const index_1 = require("./index");
const fs_1 = require("./fs");
ims_common_1.bootstrapModule(index_1.ImsFsServerModule).then(async (res) => {
    let fss = await res.injector.get(ims_core_1.InjectionToken.fromType(fs_1.ImsFsServer));
});
//# sourceMappingURL=fs.test.js.map