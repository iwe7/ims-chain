"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
const index_1 = require("./index");
const ims_ipfs_1 = require("ims-ipfs");
ims_common_1.bootstrapModule(index_1.ImsIpfsClientModule).then(async (res) => {
    let injector = res.injector;
    let ipfs = await injector.get(ims_ipfs_1.IpfsApi);
    let result = await ipfs.add([
        {
            path: "1.txt",
            content: "333"
        }
    ]);
    debugger;
});
//# sourceMappingURL=client.test.js.map