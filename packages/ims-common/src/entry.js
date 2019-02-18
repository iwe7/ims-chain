"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const ims_core_1 = require("ims-core");
exports.ENTRY = ims_core_1.InjectionToken.fromString("ENTRY");
exports.Entry = ims_decorator_1.makeDecorator(exports.ENTRY);
