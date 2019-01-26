"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const index_1 = require("./index");
const ims_cloud_1 = require("ims-cloud");
const ims_core_1 = require("ims-core");
let TestIndex = class TestIndex {
    getIndex() {
        return "get index";
    }
};
TestIndex = tslib_1.__decorate([
    ims_common_1.Injectable()
], TestIndex);
exports.TestIndex = TestIndex;
let TestCloudModule = class TestCloudModule {
};
TestCloudModule = tslib_1.__decorate([
    ims_common_1.Module({
        providers: [
            {
                provide: ims_cloud_1.Routes,
                useFactory: () => ims_core_1.InjectionToken.fromType(TestIndex)
            }
        ],
        imports: [index_1.ImsCloudServerModule]
    })
], TestCloudModule);
exports.TestCloudModule = TestCloudModule;
ims_common_1.bootstrapModule(TestCloudModule);
//# sourceMappingURL=cloud.test.js.map