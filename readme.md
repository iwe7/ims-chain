# 说明文档

基于区块链的开放、去中心化生态系统。
集微信公众平台，微信小程序，h5网页端，pc端，app及ios端，百度小程序，阿里小程序等与一体的开发框架。
完善的更新机制，应用发布体制及售后维护系统，为整个生态助力。

## 目录结构设计

* /data leveldb管理
* /ipfs ipfs存储层
* /config 配置目录
    * /db.json
* /addons 应用层
    * /第三方插件
* /node_modules 第三方库
* index.html 首页模板

## 功能
1. 查找发现插件
2. 插件安装、更新、卸载
3. 系统安装、更新、卸载、备份


## 系统模块

| 模块名              | 说明             | 文档                                |
|------------------|----------------|-----------------------------------|
| ims-core         | 依赖注入核心框架       | [查看](./packages/ims-core)         |
| ims-decorator    | 装饰器相关          | [查看](./packages/ims-decorator)    |
| ims-common       | 提供常用装饰器        | [查看](./packages/ims-common)       |
| ims-orm          | typeorm数据库操作封装 | [查看](./packages/ims-orm)          |
| ims-cloud-client | api系统客户端       | [查看](./packages/ims-cloud-client) |
| ims-cloud-server | api系统服务端       | [查看](./packages/ims-cloud-server) |
| ims-close-port   | 关闭指定端口         | [查看](./packages/ims-close-port)   |
