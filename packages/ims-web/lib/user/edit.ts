/**
 * 编辑用户
 */
export abstract class ImsUserEdit {
  abstract editBase(): Promise<any>;
  abstract editModulesTpl(): Promise<any>;
  abstract editAccount(): Promise<any>;
  abstract editUsersPermission(): Promise<any>;
}
