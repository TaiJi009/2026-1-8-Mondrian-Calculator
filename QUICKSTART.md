# 快速开始指南

## 📋 前置要求

- Node.js >= 22.0.0
- npm / yarn / pnpm

## 🚀 5 分钟快速部署

### 1. 安装依赖

```bash
npm install
```

### 2. 本地开发测试

```bash
npm run dev
```

浏览器会自动打开 http://localhost:3000，你可以测试计算器功能。

### 3. 构建生产版本

```bash
npm run build
```

构建完成后，`dist/` 目录包含所有静态文件。

### 4. 部署到 GitHub

#### 使用 GitHub Desktop：

1. 打开 GitHub Desktop
2. 点击 `File` → `Add Local Repository`
3. 选择项目文件夹
4. 填写提交信息，点击 `Commit to main`
5. 点击 `Push origin` 推送到 GitHub

#### 使用命令行：

```bash
git init
git add .
git commit -m "Initial commit: Vue 3 计算器"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 5. 部署到腾讯云 CloudBase

#### 安装 CloudBase CLI：

```bash
npm install -g @cloudbase/cli
```

#### 登录 CloudBase：

```bash
tcb login
```

#### 修改 cloudbase.json：

将 `your-env-id` 替换为你的实际环境 ID。

#### 部署：

```bash
npm run build
tcb hosting deploy dist -e 你的环境ID
```

## ✅ 完成！

部署成功后，你会得到一个 CloudBase 提供的默认域名，格式类似：
`https://你的环境ID.cloudbaseapp.com`

## 📚 更多信息

- 详细部署说明：查看 `DEPLOY.md`
- 项目说明：查看 `README.md`
- CloudBase 文档：https://cloud.tencent.com/document/product/876

