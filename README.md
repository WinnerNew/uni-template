# UniApp Template



# 简介

​
**基于`uni-app`通过`cli`手脚架创建的的多端项目模板**

```
vue create -p dcloudio/uni-preset-vue <project-name>
```

​与`HBuilder`一样支持保存时自动编译,具体可移步: [uni-app官网](https://uniapp.dcloud.io/quickstart-cli?id=%e5%88%9b%e5%bb%bauni-app)
                                      

## 安装依赖

```
npm install
```
### 初始化 husky
```
npm prepare
```
## 运行

```
npm run dev:%PLATFORM%
```

## 发布

```
npm run build:%PLATFORM%
```

## 编译后的文件

开发环境编译打包后的文件 存放在 **`dist/dev`** 中

生产环境编译打包后的文件 存放在 **`dist/prod`** 中

`tips`:需使用对应平台的开发工具**手动选择**导入

***

| 值(%PLATFORM%)          | 平台                                                                                                        |
| ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| app-plus                | app平台生成打包资源（支持npm run build:app-plus，可用于持续集成。不支持run，运行调试仍需在HBuilderX中操作） |
| h5                      | H5                                                                                                          |
| mp-weixin               | 微信小程序                                                                                                  |
| mp-alipay               | 支付宝小程序                                                                                                |
| mp-baidu                | 百度小程序                                                                                                  |
| mp-toutiao              | 字节跳动小程序                                                                                              |
| mp-lark                 | 飞书小程序                                                                                                  |
| mp-qq                   | qq 小程序                                                                                                   |
| mp-360                  | 360 小程序                                                                                                  |
| mp-kuaishou             | 快手小程序                                                                                                  |
| mp-jd                   | 京东小程序                                                                                                  |
| mp-xhs                  | 小红书小程序                                                                                                |
| quickapp-webview        | 快应用(webview)                                                                                             |
| quickapp-webview-union  | 快应用联盟                                                                                                  |
| quickapp-webview-huawei | 快应用华为                                                                                                  |


## 目录结构
```
├── dist                        # 编译打包生成的文件
│   │── ...                     # 其他
│   │── dev                     # 开发环境编译后的文件(可导入到开发工具中预览或发布)
│   └── prod                    # 生产环境编译后的文件(可导入到开发工具中预览或发布)
├── public                      # 静态资源
│   └── index.html              # html模板
└── src                         # 源代码
│   ├── api                     # 请求api
│   ├── components              # 组件
│   ├── config                  # 环境参数配置
│   ├── mixins                  # 混入
│   ├── pages                   # 页面主包文件
│   ├── pagesA                  # 页面分包文件
│   ├── static                  # 公共静态资源
│   │   ├── css                 # 样式资源
│   │   ├── font                # 文件资源
│   │   └── img                 # 字体资源 
│   │── utils                   # 工具类
│   ├── App.vue                 # 入口页面
│   ├── main.js                 # 入口文件 加载组件 初始化等
│   ├── manifest.json           # 各端应用配置文件
│   ├── pages.json              # 页面路由配置文件
│   └── uni.scss                # uni-app 内置的常用样式变量
├── .eslintignore               # eslint 忽略文件配置
├── .eslintrc.js                # eslint 配置项
├── .gitignore                  # git忽略文件配置
├── babel.config                # babel 配置
├── package.json                # 项目描述文件
├── package-lock.json           # 依赖包快照 依赖版本锁定
├── postcss.config.js           # postcss 配置
├── vue.config.js               # vue 配置 文件
└── README.md                   # 项目说明文档
```

## Eslint

- 为保证项目编程风格规范统一:

如使用 Visual Studio Code 编辑器以下操作

1. 在编辑器中安装Eslint 、 Prettier - Code formatter 插件

![](https://files.cnhnb.com/uniapp-multiterminal/imgs/md-1-1.png)

![](https://files.cnhnb.com/uniapp-multiterminal/imgs/md-1-2.png)

2. 运行npm install 安装package.json中的相关依赖 ( 内含eslint 、Prettier等依赖包 )
3. 在Visual Studio Code 编辑器的设置文件 settings.josn 中追加以下设置

```json
  "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
```

![](https://files.cnhnb.com/uniapp-multiterminal/imgs/md-2-1.png)

![](https://files.cnhnb.com/uniapp-multiterminal/imgs/md-2-2.png)

![](https://files.cnhnb.com/uniapp-multiterminal/imgs/md-2-3.png)



<!-- ### git hooks
​增加了git commit 的hooks前置钩子，会去校验代码是否符合eslint规范 -->






### `request`参数介绍

| 参数            | 全局/局部          | 局部参数                                       |
| --------------- | ------------------ | ---------------------------------------------- |
| beforeCallback  | 全局               | Function（请求前回调函数，创建实例时添加）     |
| afterCallback   | 全局               | Function（请求后回调函数，创建实例时添加）     |
| goLoginCallback | 全局               | Function（未登录回调函数，创建实例时添加）     |
| options         | 局部               | Object                                         |
| --              | --  contentType    | 请求body参数类型：`form/json`                  |
| --              | --  url            | 请求path                                       |
| --              | --  method         | 请求方式：默认`POST`                           |
| --              | --  showErrorToast | 请求异常是否需要toast提示：默认是              |
| --              | --  header         | 自定义请求头                                   |
| --              | --  data           | api需要的请求参数                              |
| --              | --  needExeAgain   | 接口报错或者异常时，可重复请求次数，默认`0`    |
| --              | --  needRepeat     | 接口是否需要防止重复请求 ，防止二次重复提交    |
| --              | --  callback       | Function(回调函数):优先级高于  goLoginCallback |
| --              | --  mock           | mock数据：生产环境下失效                       |

* 定义api：src/api/user.js文件
```js
import { request } from "@utl/request";
import { formatParam } from "@utl/index";
// api举例
// 一般业务场景
export function getUser(data) {
  return request.ajax({
    url: "/user/v2/auth",
    method: "POST",
    contentType: "json",
    data,
  });
}
//更多其他场景
export function exampleApi(data) {
  return request.ajax({
    // 传入全域名地址
    url: `http://192.168.1.2:9900/api-content/content/list?${formatParam(
      data
    )}`,
    // 定义请求头
    header: {
      Authorization: "Basic",
    },
    // 参照uni.request method字段参数  默认 'post'
    method: "POST",
    // 请求体数据
    data,
    // 是否显示loading状态 默认false
    showLoading: true,
    // 请求媒体类型 : json|form|自定义类型
    contentType: "json",
    repeat: true, // 可否重复发起该请求 默认false
    needExeAgain: 2, // 可重复请求的次数 默认0
    callback: (res) => { // 请求回调函数
      console.log("拦截数据", res);
    },
    mock: { data: [Array(10).fill({ name: "as" })] }, // mock数据
  });
```
* 调用api，推荐使用方式
```js
import { exampleApi } from "@api/user";
// methods 的getList方法
async getList() {
    const { data } = await exampleApi();
    console.log("获取数据=>", data);
},
```

### 阿里icon使用

安装iconfont工具依赖包

npm i -g iconfont-tools

​[iconfont-tools](https://www.npmjs.com/package/iconfont-tools)

[使用方法](https://juejin.cn/post/7079674057041395726)

***


### Uview 

 uView UI，是uni-app生态最优秀的UI框架，全面的组件和便捷的工具会让您信手拈来，如鱼得水

npm i -g iconfont-tools

​[iconfont-tools](https://www.npmjs.com/package/iconfont-tools)

[使用方法](https://juejin.cn/post/7079674057041395726)

***


### git提交

本项目对git提交做了eslint前置检测,提交执行`git commit -m '***'`时会检测代码是否符合`eslint`规则,`eslint`检测通过后再检测提交的信息是否符合Git提交规范

* feat - 新功能 feature
* fix - 修复 bug
* docs - 文档注释
* style - 代码格式(不影响代码运行的变动)
* refactor - 重构、优化(既不增加新功能，也不是修复bug)
* perf - 性能优化
* test - 增加测试
* chore - 构建过程或辅助工具的变动
* revert - 回退
* build - 打包
* ci - 修改构建配置或脚本

如文章模块新增评论功能
```js
git add .
git commit -m 'fix: 文章模块新增评论功能'
```
请注意`:`后的空格