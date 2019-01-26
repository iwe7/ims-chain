"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const module_1 = require("./module");
const bootstrap_1 = require("./bootstrap");
const injectable_1 = require("./injectable");
const ims_core_1 = require("ims-core");
const tokens_1 = require("./tokens");
let InjectableTest = class InjectableTest {
};
InjectableTest = tslib_1.__decorate([
    injectable_1.Injectable()
], InjectableTest);
exports.InjectableTest = InjectableTest;
let TestModule = class TestModule {
};
TestModule = tslib_1.__decorate([
    module_1.Module({
        providers: [
            {
                provide: ims_core_1.InjectionToken.fromString("test"),
                useFactory: async () => {
                    return "test";
                }
            }
        ]
    })
], TestModule);
exports.TestModule = TestModule;
let Test2Module = class Test2Module {
};
Test2Module = tslib_1.__decorate([
    module_1.Module({
        providers: [
            {
                provide: ims_core_1.InjectionToken.fromString("test2"),
                useFactory: async () => {
                    return "test";
                }
            },
            {
                provide: tokens_1.AppInitialization,
                useFactory: async (injector) => {
                    console.log("app initialization");
                    return "trest";
                }
            }
        ],
        imports: [TestModule]
    })
], Test2Module);
exports.Test2Module = Test2Module;
bootstrap_1.bootstrapModule(Test2Module).then(async (res) => {
    let test = await res.injector.get(ims_core_1.InjectionToken.fromType(InjectableTest));
    console.log(test);
    debugger;
});
//# sourceMappingURL=bootstrap.test.js.map