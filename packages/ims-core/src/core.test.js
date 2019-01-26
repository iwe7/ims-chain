"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const injection_token_1 = require("./injection_token");
async function bootstraaap() {
    let injector = await index_1.Injector.create([
        {
            provide: injection_token_1.InjectionToken.fromString("demo"),
            useFactory: injector => "demo1"
        }
    ]);
    let ij = await index_1.Injector.create([
        {
            provide: injection_token_1.InjectionToken.fromString("demo"),
            useFactory: injector => "demo"
        }
    ], injector);
    let demo = await ij.get(injection_token_1.InjectionToken.fromString("demo"));
    debugger;
}
bootstraaap();
//# sourceMappingURL=core.test.js.map