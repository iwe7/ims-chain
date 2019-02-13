export abstract class ImsMember {
  /**
   * 用户名
   */
  username: string;
  /**
   * 密码
   */
  password: string;
}
export abstract class ImsMemberFactory {
  abstract create(username: string, password: string): ImsMember;
}
