# `ims-ipns`

> 命名系统

```ts
//用户
interface User {
  publicKey: string;
  privateKey: string;
}

`User`可以创建`Folder`, 在`Folder`中可以创建文件;

// 工作空间
interface Workspace {

}

// 文件夹
interface Folder {
  contentPath: string; // 内容地址
  realPath: string; // 硬盘路径
}

// 文件
interface File {
  contentPath: string; // 内容地址
  realPath : string; // 硬盘路径
}
```
