import { ImsMc, ImsMcMember } from 'ims-web'
export class ImsMcMemberImpl extends ImsMcMember {
    async address(): Promise<any>{}
    async base_information(): Promise<any>{}
    async member_credits(): Promise<any>{}
    async credit_statistics(): Promise<any>{}
    async display(): Promise<any>{}
    async del(): Promise<any>{}
    async add(): Promise<any>{}
    async group(): Promise<any>{}
    async register_setting(): Promise<any>{}
    async credit_setting(): Promise<any>{}
    async save_credit_setting(): Promise<any>{}
    async save_tactics_setting(): Promise<any>{}
}

export class ImsMcImpl extends ImsMc {
    member: ImsMcMember = new ImsMcMemberImpl();
}
