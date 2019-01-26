"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const injection_token_1 = require("./injection_token");
let token = new injection_token_1.InjectionToken("demo", "demo");
const assert_1 = require("assert");
token.hash.then(res => {
    assert_1.equal(res, "QmQ81NyMcYYp4j8Y1nNYsjpj8ZrLZS3kHCFKk8DgoNWkUZ", "InjectionTOken.hash");
    console.log(res);
});
//# sourceMappingURL=injection_token.test.js.map