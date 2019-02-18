export abstract class ImsDb {
    /**
     * 表名字
     */
    public name: string;
    /**
     * 插入
     */
    abstract insert(data: any): Promise<any>;
    /**
     * 获取
     */
    abstract get(id: string): Promise<any>;
    /**
     * 删除
     */
    abstract delete(id: string): Promise<any>;
    /**
     * 更新
     */
    abstract update(id: string, value: any): Promise<any>;
    /**
     * 查找
     */
    abstract fetch(where: any): Promise<any>;
    /**
     * 一列
     * @param where
     */
    abstract fetchColumn(where: any): Promise<any>;
    /**
     * 搜索
     */
    abstract fetchall(where: any): Promise<any>;
}
