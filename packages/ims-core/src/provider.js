"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isStaticProviderFn(val) {
    return typeof val === "function";
}
exports.isStaticProviderFn = isStaticProviderFn;
function isFactoryProvider(val) {
    return Reflect.has(val, "provide") && Reflect.has(val, "useFactory");
}
exports.isFactoryProvider = isFactoryProvider;
//# sourceMappingURL=provider.js.map