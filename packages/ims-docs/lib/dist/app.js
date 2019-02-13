System.register("lib/config", ["systemjs"], function (exports_1, context_1) {
    "use strict";
    var systemjs_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (systemjs_1_1) {
                systemjs_1 = systemjs_1_1;
            }
        ],
        execute: function () {
            systemjs_1.config({
                baseURL: "./"
            });
        }
    };
});
System.register("lib/app", ["lib/config"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (_1) {
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=app.js.map