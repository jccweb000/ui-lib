# ui-lib

基于 `React 18 + TypeScript + Rollup + pnpm + Nx + Lerna` 的组件库 monorepo。

当前仓库包含 3 个项目：

- `packages/ui`：UI 组件包，包名为 `@jccnpm/ui`
- `packages/utils`：工具函数包，包名为 `@jccnpm/utils`
- `apps/playground`：本地调试应用，用于联调组件、主题和工具函数

## 技术栈

- `React 18`
- `TypeScript`
- `Rollup`
- `pnpm workspace`
- `Nx`
- `Lerna`
- `Vite`
- `Vitest`

## 仓库结构

```text
.
├── apps
│   └── playground
├── packages
│   ├── ui
│   └── utils
├── tools
│   ├── release
│   └── rollup
├── lerna.json
├── nx.json
├── package.json
└── pnpm-workspace.yaml
```

## 样式系统

`@jccnpm/ui` 采用三层 token 结构：

1. 基础 token：颜色、字号、间距、圆角等原子值
2. 语义 token：`primary`、`text`、`border`、`bg-container` 等场景抽象
3. 组件 token：`Button`、`Input` 等组件的最终样式变量

底层统一使用 `CSS Variables` 承载 token，并通过 `ThemeProvider` 在作用域容器上注入变量，支持：

- 应用级主题覆盖
- 嵌套局部换肤
- 组件无需改代码即可响应主题变化

## 环境要求

- `Node.js >= 16.20`
- `pnpm >= 8`

安装依赖：

```bash
pnpm install
```

## 开发流程

### 1. 启动 playground

```bash
pnpm dev
```

该命令会启动 `apps/playground`，页面直接消费 `@jccnpm/ui` 和 `@jccnpm/utils` 的源码入口，适合调试：

- 组件交互
- 主题切换
- 局部换肤
- 工具函数行为

### 2. 常用检查命令

在仓库根目录运行：

```bash
pnpm lint
pnpm test
pnpm typecheck
pnpm build
```

这些命令统一通过 `Nx` 调度 `playground`、`ui`、`utils` 的对应任务。

当前根脚本已经内置了适配当前环境的 Nx 参数，执行时会关闭 daemon、插件隔离和 project graph 缓存，以确保任务在本地和受限环境中都能稳定运行。

### 3. 单项目调试

如果只想执行某个项目的命令，可以使用 `pnpm --filter`：

```bash
pnpm --filter @jccnpm/ui run test
pnpm --filter @jccnpm/utils run build
pnpm --filter @jccnpm/playground run dev
```

## 构建产物

### `@jccnpm/utils`

构建后输出：

- `dist/index.mjs`
- `dist/index.cjs`
- `dist/index.d.ts`

### `@jccnpm/ui`

构建后输出：

- `dist/index.mjs`
- `dist/index.cjs`
- `dist/index.d.ts`
- `dist/styles.css`

对外入口：

- `@jccnpm/ui`
- `@jccnpm/ui/styles.css`

## 发布流程

当前发布目标已经固定为：

- registry：`https://registry.npmjs.org/`
- scope：`@jccnpm`
- 认证方式：`npm login`
- 发布方式：本地手动发布

仓库根目录的 [.npmrc](/Users/jichangchun/code/personal/ui-lib/.npmrc) 已经写入 scope 到 npm 官方源的映射，不包含任何账号或凭据。

### 前置条件

在执行版本升级或真实发布前，需要先满足以下条件：

1. 仓库已经初始化 `git`
2. 当前分支工作区干净，避免把未确认改动带进版本流程
3. 已完成 `pnpm lint && pnpm test && pnpm build && pnpm typecheck`
4. 已完成 npm 登录，具备目标 scope 的发布权限

### 推荐发版本顺序

日常发版建议直接按下面顺序执行：

1. 登录 npm

```bash
pnpm release:login
```

2. 执行完整预检

```bash
pnpm release:preflight
```

3. 生成版本号和 tag

```bash
pnpm release:version
```

4. 检查版本变更结果，确认 `packages/ui/package.json`、`packages/utils/package.json` 和 git tag 符合预期

5. 如果需要把版本提交和 tag 同步到远端，执行：

```bash
git push origin main --follow-tags
```

6. 正式发布：

```bash
pnpm release:publish
```

简化理解就是：

```bash
pnpm release:login
pnpm release:preflight
pnpm release:version
git push origin main --follow-tags
pnpm release:publish
```

### 1. 登录 npm

首次发布前执行：

```bash
pnpm release:login
```

该命令等价于：

```bash
npm login --registry=https://registry.npmjs.org/ --scope=@jccnpm
```

### 2. 校验当前登录账号

```bash
pnpm release:whoami
```

该命令会执行 `npm whoami`，确认当前终端已经登录到 npm 官方源。

### 3. 一次性执行发布前预检

```bash
pnpm release:preflight
```

该命令会依次执行：

- `pnpm lint`
- `pnpm test`
- `pnpm build`
- `pnpm typecheck`
- `pnpm release:whoami`
- `pnpm release:publish:dry`

### 4. 发布前打包检查

```bash
pnpm release:publish:dry
```

该命令会对 `packages/*` 下的可发布包执行 `npm pack --dry-run`，用于确认：

- 包内容是否完整
- `files` / `exports` / `types` 是否正确
- 发布产物是否已经生成

### 5. 升级版本

```bash
pnpm release:version
```

该命令使用 `Lerna` 的独立版本策略：

- 每个包可以单独升级版本
- 会更新对应包的 `package.json`
- 会生成 git tag

说明：

- 该步骤依赖 git 仓库
- 建议在执行前先提交当前改动

### 6. 正式发布

```bash
pnpm release:publish
```

该命令会先执行 `pnpm release:whoami`，然后基于已经写入版本号的包执行 `lerna publish from-package`。

适用场景：

- 已完成版本提升
- 已完成构建
- 已确认 npm 权限和 registry 配置

## 包内开发约定

### `@jccnpm/ui`

- 组件通过统一 class 规范管理结构、状态和变体
- 主题覆盖通过 `ThemeProvider` 注入 CSS Variables
- 组件内部尽量不依赖大量内联样式

### `@jccnpm/utils`

- 保持纯函数和通用工具定位
- 不引入 React 依赖
- 可被 `ui` 和 `playground` 直接复用

## 当前已提供内容

### `@jccnpm/ui`

- `Button`
- `Input`
- `ThemeProvider`
- `ThemeOverrides`

### `@jccnpm/utils`

- `cx`
- `clamp`
- `isNil`
