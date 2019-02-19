"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_web_1 = require("ims-web");
class ImsMcMemberImpl extends ims_web_1.ImsMcMember {
    async address() { }
    async base_information() { }
    async member_credits() { }
    async credit_statistics() { }
    async display() { }
    async del() { }
    async add() { }
    async group() { }
    async register_setting() { }
    async credit_setting() { }
    async save_credit_setting() { }
    async save_tactics_setting() { }
}
exports.ImsMcMemberImpl = ImsMcMemberImpl;
class ImsMcImpl extends ims_web_1.ImsMc {
    constructor() {
        super(...arguments);
        this.member = new ImsMcMemberImpl();
    }
}
exports.ImsMcImpl = ImsMcImpl;
