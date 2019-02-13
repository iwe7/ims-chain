export class Ipfs {}

/**
 * 作者
 */
export class Author {
  /**
   * 地址
   */
  id: string;
  /**
   * 私钥
   */
  privKey: string;
  /**
   * 公钥
   */
  pubKey: string;
}

/**
 * 作者信息
 */
export class AuthorInfo {
  /**
   * 姓名
   */
  realname: string;
  /**
   * 手机号
   */
  mobile: string;
  /**
   * 昵称
   */
  nickname: string;
  /**
   * 头像
   */
  avatar: string;
}

export class AuthorAddress {
  add() {}
  addSafe() {}
}

/**
 * 内容寻址
 */
export class Loader {
  ipfs: Ipfs;
  author: Author;
  /**
   * 引入
   * @param moduleName 模块名
   * @param normalizedParentName
   */
  async import(moduleName: string, normalizedParentName?: string) {}
  /**
   * 解析
   * @param moduleName
   * @param parentName
   */
  async resolve(moduleName: string, parentName?: string) {}
  /**
   * 注册
   * @param name
   * @param deps
   * @param declare
   */
  async register(
    name: string,
    deps: string[],
    declare: (...modules: any[]) => any
  ) {}
  /**
   * 设置
   * @param moduleName
   * @param module
   */
  async set(moduleName: string, module: any) {}
  /**
   * 获取
   * @param moduleName
   */
  async get(moduleName: string) {}
  /**
   * 删除
   * @param moduleName
   */
  async delete(moduleName: string) {}
  /**
   * 配置
   * @param config
   */
  async config(config: any) {}
}
