# Netlify 部署指南

## 前置条件

1. 确保已安装 [Node.js v18+](https://nodejs.org/)
2. 拥有 [Netlify 账号](https://app.netlify.com/)
3. 项目已推送到 GitHub 仓库

## 部署步骤

### 1. 配置环境变量

在项目根目录创建 `.env.production` 文件，内容如下：

```env
VITE_API_URL="https://api.yourdomain.com"
VITE_FIREBASE_CONFIG="your-firebase-config-json"
```

### 2. 构建项目

```bash
npm run build:web
```

### 3. 部署到 Netlify

1. 登录 [Netlify 控制台](https://app.netlify.com/)
2. 点击 "New site from Git"
3. 选择您的 GitHub 仓库
4. 配置构建设置：
   - **Build command:** `npm run build:web`
   - **Publish directory:** `apps/desktop/out/web`
5. 添加环境变量（对应 `.env.production` 中的内容）
6. 点击 "Deploy site"

### 4. 配置自定义域名（可选）

在 Netlify 的 "Domain settings" 中配置您的自定义域名

## 注意事项

- 确保 `netlify.toml` 文件已提交到仓库
- 生产环境变量请勿提交到公开仓库
- 首次部署可能需要 5-10 分钟
