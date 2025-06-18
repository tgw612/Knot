# SSR 服务端渲染与 API 说明

## 目录结构与功能概述

本目录为 SSR（Server Side Rendering）服务端渲染应用，基于 Fastify 框架实现，主要用于服务端渲染页面和提供 API 接口。

- `index.ts`：服务端主入口，负责创建和配置 Fastify 实例，注册中间件、错误处理、API 路由等。
- `api/`：API 适配层，`api/index.ts` 作为云函数/Serverless 入口，调用 SSR 服务。
- `src/`：核心源码，包括路由、业务模块、工具库等。
- `client/`：前端相关代码。
- `public/`：静态资源目录。
- `tsup.config.ts`：构建配置，输出到 `dist/server`，采用 CommonJS 格式。
- 其他配置文件如 `tsconfig.json`、`vite.config.mts`、`tailwind.config.ts` 等。

## 启动与构建说明

- 使用 `tsup` 进行服务端代码打包，入口为 `index.ts`，输出到 `dist/server`。
- 通过 `api/index.ts` 作为 Serverless 入口，自动调用 `createApp` 并处理 HTTP 请求。
- 支持本地开发和生产环境切换，自动设置上游 API 地址。

## 主要依赖

- [Fastify](https://www.fastify.io/)：高性能 Node.js Web 框架。
- [middie](https://github.com/fastify/middie)：中间件支持。
- [fastify-request-context](https://github.com/fastify/fastify-request-context)：请求上下文。
- [cors](https://github.com/fastify/fastify-cors)：跨域支持。

## API 路由列表

以下为扫描到的主要 API 路由及其用途：

### 全局路由 global

- `GET *`  
  通配所有路径，处理全局 SSR 渲染或兜底逻辑。

### OG 图路由 og

- `GET /og/:type/:id`  
  生成指定类型和 ID 的 Open Graph 图片。

### 其他

- `GET *`（global 路由中出现多次）

> 具体路由实现详见 `src/router/global.ts` 与 `src/router/og/index.ts`。

## 入口说明

- `api/index.ts` 作为 Serverless 入口，导出 `handler` 方法，自动创建 SSR 应用并处理请求。
- `index.ts` 导出 `createApp`，负责应用初始化。

## 参考

- [Fastify 官方文档](https://www.fastify.io/docs/latest/)
- [tsup 文档](https://tsup.egoist.dev/)

---

如需补充更多 API 或详细参数说明，请查阅源码或联系维护者。
