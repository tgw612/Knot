# Popfun 桌面端（apps/desktop）

Popfun 桌面端是一个基于 Electron 和 React 技术栈开发的现代化信息聚合与阅读应用，支持多平台打包与分发，具备丰富的 UI 组件和高度可定制的构建流程。

## 关键特性

- **名称**：Popfun
- **版本**：1.0.0
- **主页**：[https://github.com/RSSNext/Popfun](https://github.com/RSSNext/Popfun)
- **作者**：Popfun Team
- **协议**：GPL-3.0

## 项目定位

- **名称**：Folo
- **描述**：Follow everything in one place —— 聚合多源信息，统一管理与阅读体验。
- **主页**：[https://github.com/RSSNext/Folo](https://github.com/RSSNext/Folo)
- **作者**：Folo Team

## 主要功能

- 跨平台桌面应用（支持 macOS、Windows、Linux）
- 丰富的 UI 组件与主题适配
- 支持多语言与国际化
- 高度模块化，便于扩展
- 集成 Sentry 错误监控、OpenPanel 分析等
- 支持 PWA、Web 端构建

## 目录结构概览

- `build/`：应用打包与签名相关文件（如图标、entitlements 等）
- `changelog/`：版本更新日志
- `configs/`：Vite 等构建工具配置
- `layer/`：主代码层，分为 `main`（Electron 主进程）与 `renderer`（渲染进程/前端）
- `plugins/`：Vite 插件与自定义构建脚本
- `resources/`：应用资源（图标、更新配置等）
- `static/`：静态资源（如 DMG 背景图等）
- `scripts/`：自动化脚本

## 关键技术栈

- **Electron**：跨平台桌面应用框架
- **React 19**：前端 UI 框架，支持 JSX/TSX
- **Vite**：极速开发与构建工具，支持多环境配置
- **Tailwind CSS**：原子化 CSS 框架，支持自定义主题
- **TypeScript**：类型安全开发
- **Sentry**：错误监控与追踪
- **OpenPanel**：用户行为分析
- **Drizzle ORM**：数据库操作

## 构建与开发

- **开发启动**：
  - `pnpm dev:electron` 启动 Electron 桌面端开发环境
  - `pnpm dev:web` 启动 Web 端开发环境
- **打包构建**：
  - `pnpm build:electron` 构建桌面端应用
  - `pnpm build:web` 构建 Web 端
  - `pnpm build:electron-forge:macos` 针对 macOS 平台打包
- **发布**：
  - `pnpm publish` 自动完成构建与发布流程

## 重要配置与脚本说明

- `package.json`：定义了项目依赖、脚本命令、产品信息等
- `vite.config.ts`：Vite 主配置，支持多端构建、代理、PWA、插件扩展等
- `forge.config.cts`：Electron Forge 打包配置，支持多平台、自动清理、语言包处理等
- `layer/renderer/src/modules/timeline-column/TimelineColumnHeader.tsx`：示例 UI 组件，展示了 React 组件化开发与 UI 交互逻辑
- `layer/renderer/src/initialize/sentry.ts`：Sentry 错误监控初始化逻辑

## 运行与调试

- 推荐使用 [pnpm](https://pnpm.io/) 进行依赖管理与脚本执行
- 开发环境下可通过 Vite 热更新快速预览 UI 变更
- Electron 主进程与渲染进程代码分离，便于调试与维护

## 贡献与扩展

- 支持多语言与本地化，相关内容位于 `locales/`
- UI 组件高度复用，便于二次开发
- 支持插件与脚本扩展，提升开发效率

---

如需详细开发文档、API 说明或贡献指南，请访问主仓库 [README](https://github.com/RSSNext/Popfun) 或查阅源码注释。
