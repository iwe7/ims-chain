"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const ims_common_1 = require("ims-common");
const token_1 = require("./token");
ims_common_1.bootstrapModule(index_1.ImsRepoModule).then(async (res) => {
    let repos = await res.injector.get(token_1.ImsBlockService);
    debugger;
});
//# sourceMappingURL=repo.test.js.map