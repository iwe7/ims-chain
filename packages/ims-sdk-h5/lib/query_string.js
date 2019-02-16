"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const qs = require('querystringify');
const ims_common_1 = require("ims-common");
let QueryString = class QueryString {
    parse(url) {
        return qs.parse(url);
    }
    stringify(val) {
        return qs.stringify(val);
    }
};
QueryString = tslib_1.__decorate([
    ims_common_1.Injectable()
], QueryString);
exports.QueryString = QueryString;
