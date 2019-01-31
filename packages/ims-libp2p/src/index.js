"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
let a = rxjs_1.from([1, 2, 3]);
let b = rxjs_1.from([4, 5, 6]);
a.pipe().subscribe();
