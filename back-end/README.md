# 说明
demo 主要依赖：
* 基于`expressJs`制作
* 使用`mysql`作为数据库
* 使用`joi` 校验客户端参数
* 使用 `jwt` 作为登录方案
* 使用 `restful` 作为API规范
* 使用 `pm2` 运行项目，使项目能够自动重启，收集日志，增强性能（cluster）
* 使用 `jest` 作为单元测试框架

# mysql 时区
```sql
SET time_zone = 'Asia/Shanghai';
```
其中时间创建时间和更新时间由mysql引擎自动更新，所以时区要设置好。

# 导入mysql
运行程序需要先导入sql文件，SBC.sql

数据库配置见：`/config/index.js`

# 运行程序需要
node 版本: `v18.12.1`

```bash
npm i
npm start
```

# api
将 `SBC.postman_collection.json` 文件导入postman即可

# 性能
使用 `pm2` 并使用集群模块，从而实现多线程工作

# 单元测试
```bash
npm run test
```
在node服务运行的情况下，运行 `jest` 程序