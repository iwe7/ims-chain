"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const ims_core_1 = require("ims-core");
const ims_cloud_1 = require("ims-cloud");
let TestIndex = class TestIndex {
    getIndex() {
        return "get index";
    }
};
TestIndex = tslib_1.__decorate([
    ims_common_1.Injectable()
], TestIndex);
exports.TestIndex = TestIndex;
let TestModule = class TestModule {
};
TestModule = tslib_1.__decorate([
    ims_common_1.Module({
        providers: [
            {
                provide: ims_cloud_1.Fetch,
                useFactory: () => require("node-fetch")
            },
            {
                provide: ims_cloud_1.Routes,
                useFactory: () => ims_core_1.InjectionToken.fromType(TestIndex)
            }
        ]
    })
], TestModule);
exports.TestModule = TestModule;
ims_common_1.bootstrapModule(TestModule).then(async (res) => {
    let test = await res.injector.get(ims_core_1.InjectionToken.fromType(TestIndex));
    let result = await test.getIndex();
    debugger;
});
//# sourceMappingURL=client.test.js.map