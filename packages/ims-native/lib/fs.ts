export abstract class ImsNativeFs {
  /**
   * 保存文件到本地。注意：saveFile 会把临时文件移动，
   * 因此调用成功后传入的 tempFilePath 将不可用
   */
  abstract saveFile(): any;
  /**
   * 删除本地缓存文件
   */
  abstract removeSavedFile(): any;
  /**
   * 新开页面打开文档
   */
  abstract openDocument(): any;
  /**
   * 获取该小程序下已保存的本地缓存文件列表
   */
  abstract getSavedFileList(): any;
  /**
   * 获取本地文件的文件信息。
   * 此接口只能用于获取已保存到本地的文件，若需要获取临时文件信息，
   * 请使用 wx.getFileInfo() 接口。
   */
  abstract getSavedFileInfo(): any;
  /**
   * 获取全局唯一的文件管理器
   */
  abstract getFileSystemManager(): ImsNativeFsManager;
  /**
   * 获取文件信息
   */
  abstract getFileInfo(): any;
}

export abstract class ImsNativeFsManager {
  /**
   * 判断文件/目录是否存在
   */
  abstract access(): any;
  abstract accessSync(): any;

  /**
   * 在文件结尾追加内容
   */
  abstract appendFile(): any;
  abstract appendFileSync(): any;
  /**
   * 复制文件
   */
  abstract copyFile(): any;
  abstract copyFileSync(): any;

  /**
   * 获取该小程序下的 本地临时文件 或 本地缓存文件 信息
   */
  abstract getFileInfo(): any;
  /**
   * 获取该小程序下已保存的本地缓存文件列表
   */
  abstract getSavedFileList(): any;

  /**
   * 创建目录
   */
  abstract mkdir(): any;
  abstract mkdirSync(): any;

  /**
   * 读取目录内文件列表
   */
  abstract readdir(): any;
  abstract readdirSync(): any;

  /**
   * 读取本地文件内容
   */
  abstract readFile(): any;
  abstract readFileSync(): any;

  /**
   * 删除该小程序下已保存的本地缓存文件
   */
  abstract removeSavedFile(): any;

  /**
   * 重命名文件。可以把文件从 oldPath 移动到 newPath
   */
  abstract rename(): any;
  abstract renameSync(): any;

  /**
   * 删除目录
   */
  abstract rmdir(): any;
  abstract rmdirSync(): any;

  /**
   * 保存临时文件到本地。
   * 此接口会移动临时文件，因此调用成功后，tempFilePath 将不可用。
   */
  abstract saveFile(): any;
  abstract saveFileSync(): any;

  /**
   * 获取文件 Stats 对象
   */
  abstract stat(): ImsNativeFsStats;
  abstract statSync(): ImsNativeFsStats;

  /**
   * 删除文件
   */
  abstract unlink(): any;
  abstract unlinkSync(): any;

  /**
   * 解压文件
   */
  abstract unzip(): any;
  /**
   * 写文件
   */
  abstract writeFile(): any;
  abstract writeFileSync(): any;
}

export abstract class ImsNativeFsStats {
  /**
   * 判断当前文件是否一个目录
   */
  abstract isDirectory(): any;
  /**
   * 判断当前文件是否一个普通文件
   */
  abstract isFile(): any;
}
