export declare abstract class ImsDb {
    name: string;
    abstract insert(data: any): Promise<any>;
    abstract get(id: string): Promise<any>;
    abstract delete(id: string): Promise<any>;
    abstract update(id: string, value: any): Promise<any>;
    abstract fetch(where: any): Promise<any>;
    abstract fetchColumn(where: any): Promise<any>;
    abstract fetchall(where: any): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map