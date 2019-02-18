import { ImsIpfsKey } from 'ims-web'
export class ImsIpfsKeyImpl extends ImsIpfsKey {
    constructor(private api: any) {
        super();
    }

    gen(name: string): Promise<any> {
        return this.api.key.gen(name, {
            type: "rsa",
            size: 2048
        });
    }
    async get(name: string): Promise<{ id: string, name: string }> {
        const list = await this.list();
        let it = list.find(item => item.name === name);
        if (it) return it;
        return this.gen(name);
    }
    list(): Promise<any> {
        return this.api.key.list();
    }
    rm(name: string): Promise<any> {
        return this.api.key.rm(name);
    }
    rename(oldName: string, newName: string): Promise<any> {
        return this.api.key.rename(oldName, newName);
    }
    export(name: string, password: string): Promise<any> {
        return this.api.key.export(name, password);
    }
    import(name: string, pem: string, password: string): Promise<any> {
        return this.api.key.import(name, pem, password);
    }
}
