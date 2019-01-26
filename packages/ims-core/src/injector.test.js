"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const injector_1 = require("./injector");
const injection_token_1 = require("./injection_token");
let token = new injection_token_1.InjectionToken("demo", "demo");
async function bootstrap() {
    let injector = await injector_1.Injector.create([
        {
            provide: token,
            useFactory: async () => {
                return {
                    demo: "title"
                };
            }
        }
    ]);
    let ref = await injector.get(token);
    debugger;
}
bootstrap();
//# sourceMappingURL=injector.test.js.map