# Netlify 生产环境部署指南

## 配置检查清单

1. **环境变量设置**
   - 在Netlify控制台设置以下环境变量：
     - `VITE_API_URL`: 生产环境API地址
     - `VITE_FIREBASE_CONFIG`: Firebase配置JSON
     - `NODE_VERSION`: 指定Node.js版本

2. **重定向规则验证**
   - 确保`/api/*`重定向到正确的后端服务
   - 静态资源路径`/assets/*`配置正确
   - SSR函数路由`/*`指向`/.netlify/functions/index`

3. **构建配置**
   - `base`目录: `apps/ssr`
   - `publish`目录: `dist/client`
   - 构建命令: `pnpm build`

## 部署步骤

1. 将代码推送到GitHub仓库
2. 登录Netlify控制台
3. 选择"New site from Git"
4. 连接GitHub仓库
5. 配置构建设置：
   ```
   Build command: pnpm build
   Publish directory: apps/ssr/dist/client
   ```
6. 在"Environment variables"中添加所需环境变量
7. 点击"Deploy site"

## 验证部署

1. 访问生成的Netlify域名
2. 检查控制台无错误
3. 测试API端点是否正常
4. 验证静态资源加载
5. 检查SSR页面渲染

## 问题排查

- **构建失败**：检查Netlify日志中的错误信息
- **环境变量未生效**：确认在Netlify控制台正确设置
- **重定向循环**：检查`/api/*`规则的目标地址
- **SSR函数超时**：增加Netlify函数超时时间（默认10秒）

---

## 多端部署（desktop/web + ssr）方案

### 方案说明

Netlify 默认只支持单一 publish 目录。要同时部署 desktop/web（out/web）和 ssr（dist/client）产物，推荐如下流程：

#### 1. 构建产物合并脚本

在项目根目录新建 `scripts/merge-netlify-dist.js`：

```js:/Users/erich/Documents/code/pop-fun/scripts/merge-netlify-dist.js
// 合并 desktop/web 和 ssr 的构建产物到 netlify_dist 目录
const fs = require('fs-extra')
const path = require('path')

const desktopWeb = path.resolve(__dirname, '../apps/desktop/out/web')
const ssrClient = path.resolve(__dirname, '../apps/ssr/dist/client')
const target = path.resolve(__dirname, '../netlify_dist')

fs.removeSync(target)
fs.ensureDirSync(target)
fs.copySync(desktopWeb, path.join(target, 'web'))
fs.copySync(ssrClient, path.join(target, 'ssr'))
console.log('已合并 desktop/web 和 ssr 产物到 netlify_dist')
```

#### 2. Netlify 配置调整

在 `netlify.toml` 中：

```toml:/Users/erich/Documents/code/pop-fun/netlify.toml
[build]
  publish = "netlify_dist"
  command = "pnpm run build:web && pnpm --filter @follow/ssr build && node scripts/merge-netlify-dist.js"

[[redirects]]
  from = "/web/*"
  to = "/web/:splat"
  status = 200

[[redirects]]
  from = "/ssr/*"
  to = "/ssr/:splat"
  status = 200
```

#### 3. 部署流程

- 按上述脚本和配置调整项目
- 推送代码到 GitHub
- 在 Netlify 选择 `netlify_dist` 作为 publish 目录
- 验证 `/web` 和 `/ssr` 路径均可访问对应产物

如需更详细的CI自动化或路由规则，可进一步说明需求。
