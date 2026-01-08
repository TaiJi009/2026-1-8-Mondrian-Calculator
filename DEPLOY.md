# 腾讯云 CloudBase 部署指南

## 前置准备

1. **注册腾讯云账号**：https://cloud.tencent.com
2. **开通 CloudBase 服务**：在腾讯云控制台开通静态网站托管服务
3. **获取环境 ID**：在 CloudBase 控制台创建环境，记录环境 ID

## 部署步骤

### 方法一：使用 CloudBase CLI（推荐）

#### 1. 安装 CloudBase CLI

```bash
npm install -g @cloudbase/cli
```

#### 2. 登录 CloudBase

```bash
tcb login
```

按照提示完成登录。

#### 3. 修改 cloudbase.json

编辑 `cloudbase.json`，将 `your-env-id` 替换为你的实际环境 ID：

```json
{
  "version": "2.0",
  "envId": "你的环境ID",
  "framework": {
    "name": "vue",
    "runtime": "nodejs22"
  },
  "static": {
    "root": "dist",
    "index": "index.html",
    "error": "index.html"
  }
}
```

#### 4. 构建项目

```bash
npm run build
```

#### 5. 部署到 CloudBase

```bash
tcb hosting deploy dist -e 你的环境ID
```

或者直接使用配置文件：

```bash
tcb hosting deploy dist
```

#### 6. 访问网站

部署成功后，CloudBase 会提供一个默认域名，格式类似：
`https://你的环境ID.cloudbaseapp.com`

### 方法二：通过 GitHub Actions 自动部署

#### 1. 创建 GitHub Actions 工作流

在项目根目录创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to CloudBase

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '22'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
    
    - name: Deploy to CloudBase
      uses: TencentCloudBase/cloudbase-action@v2
      with:
        secretId: ${{ secrets.CLOUDBASE_SECRET_ID }}
        secretKey: ${{ secrets.CLOUDBASE_SECRET_KEY }}
        envId: ${{ secrets.CLOUDBASE_ENV_ID }}
        staticPath: dist
```

#### 2. 配置 GitHub Secrets

在 GitHub 仓库设置中添加以下 Secrets：

- `CLOUDBASE_SECRET_ID`：腾讯云 SecretId
- `CLOUDBASE_SECRET_KEY`：腾讯云 SecretKey
- `CLOUDBASE_ENV_ID`：CloudBase 环境 ID

#### 3. 推送代码

每次推送到 `main` 分支，GitHub Actions 会自动构建并部署。

### 方法三：通过 CloudBase 控制台上传

1. 在本地构建项目：`npm run build`
2. 登录 CloudBase 控制台
3. 进入「静态网站托管」页面
4. 点击「上传文件」
5. 选择 `dist` 目录下的所有文件上传
6. 等待上传完成

## 配置自定义域名

1. 在 CloudBase 控制台进入「静态网站托管」
2. 点击「域名管理」
3. 添加你的自定义域名
4. 按照提示完成 DNS 配置
5. 等待 SSL 证书自动配置完成

## 常见问题

### Q: 部署后页面空白？

A: 检查 `cloudbase.json` 中的 `root` 和 `index` 配置是否正确。

### Q: 路由刷新 404？

A: 确保 `cloudbase.json` 中配置了 `error: "index.html"`，这样所有路由都会回退到 index.html。

### Q: 如何更新部署？

A: 重新执行构建和部署命令即可：
```bash
npm run build
tcb hosting deploy dist -e 你的环境ID
```

### Q: 如何回滚到之前的版本？

A: 在 CloudBase 控制台的「静态网站托管」页面，可以查看历史版本并回滚。

## 参考链接

- [CloudBase 官方文档](https://cloud.tencent.com/document/product/876)
- [CloudBase CLI 文档](https://docs.cloudbase.net/cli-v1/intro)
- [Vue 3 文档](https://cn.vuejs.org/)
- [Vite 文档](https://cn.vitejs.dev/)


