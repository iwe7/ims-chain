System.register("lib/index", ["express", "http"], function (exports_1, context_1) {
    "use strict";
    var express, http;
    var __moduleName = context_1 && context_1.id;
    function bootstrap() {
        var app = express();
        app.use(express.static(__dirname));
        var server = http.createServer(app);
        server.listen();
        var address = server.address();
        if (typeof address === "string") {
        }
        else {
            console.log("http://localhost:" + address.port);
        }
    }
    exports_1("bootstrap", bootstrap);
    return {
        setters: [
            function (express_1) {
                express = express_1;
            },
            function (http_1) {
                http = http_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("lib/server", ["lib/index"], function (exports_2, context_2) {
    "use strict";
    var total, index_1;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            total = 2;
            for (var i = 0; i < total; i++) {
                index_1.bootstrap();
            }
        }
    };
});
//# sourceMappingURL=index.js.map