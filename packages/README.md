# Folo Monorepo Packages 说明

本目录包含多个子包，涵盖组件、hooks、工具、类型、配置等，旨在为 Web3 Social 项目提供完整的内部支持。以下为各子包功能简介及主要 API 接口汇总，便于团队成员查阅和维护。

---

## 目录结构与功能说明

### configs

- **功能**：存放项目通用配置，如 TailwindCSS 配置、TypeScript 扩展配置等。
- **主要内容**：
  - `tailwindcss/`：TailwindCSS 相关扩展与插件。
  - `tsconfig.extend.json`：TypeScript 配置扩展。

### internal

- **atoms**：原子状态管理相关实现。
- **components**：UI 组件库，包含基础与复合组件。
- **constants**：全局常量与枚举定义。
- **hooks**：自定义 React Hooks。
- **logger**：日志工具，支持 Electron 与 Web 环境。
- **models**：数据模型定义。
- **shared**：通用工具、环境变量、API 路由等共享逻辑。
- **tracker**：埋点与追踪相关逻辑，包含 API 封装。
- **types**：全局类型定义。
- **utils**：通用工具函数集合。

### readability

- **功能**：内容可读性分析与处理工具。
- **主要内容**：
  - `src/index.ts`：核心实现。

---

## 主要 API 接口汇总

### tracker 包 API 封装

- **文件**：`internal/tracker/src/op/api.ts`
- **核心类**：`Api`
  - **构造参数**：
    - `baseUrl`：基础 API 地址
    - `defaultHeaders`：默认请求头
    - `maxRetries`：最大重试次数（默认3）
    - `initialRetryDelay`：初始重试延迟（默认500ms）
  - **主要方法**：
    - `fetch(path, data, options)`：发起 POST 请求，自动处理重试与 headers。

### shared 包 API 路由与 OpenAPI Schema

- **文件**：`internal/shared/src/hono.ts`
- **内容**：
  - 大量 `endpoints`、`openapi`、`request`、`requestBody`、`OpenAPISchema` 等定义，涵盖如 feeds、users、wallets、timeline、rsshub、actions、lists、inboxes、transactions 等模块。
  - 具体接口路径、参数与返回结构建议参考源码自动生成的 OpenAPI Schema。

### 其他 API 相关定义

- **环境变量**：
  - `VITE_API_URL`、`VITE_OPENPANEL_API_URL` 等在 `internal/shared/src/env.*.ts`、`internal/types/vite-env.d.ts`、`internal/shared/src/env.common.ts` 等文件中定义。
- **路由相关**：
  - `internal/constants/src/enums.ts` 中定义了 `Routes` 枚举。
  - `internal/utils/src/route-builder.ts` 提供了路由对象构建工具。

---

## 说明

- 本文档仅为自动梳理，详细接口参数与返回结构建议结合源码与类型定义查阅。
- 若需补充具体 API 示例或详细参数说明，请联系相关模块负责人或查阅源码注释。
