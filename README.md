# ui-lib

基于 `React 18 + TypeScript + Rollup + pnpm + Nx + Lerna` 的组件库 monorepo。

当前仓库包含 3 个项目：

- `packages/ui`：UI 组件包，包名为 `@ui-lib/ui`
- `packages/utils`：工具函数包，包名为 `@ui-lib/utils`
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

`@ui-lib/ui` 采用三层 token 结构：

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

该命令会启动 `apps/playground`，页面直接消费 `@ui-lib/ui` 和 `@ui-lib/utils` 的源码入口，适合调试：

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
pnpm --filter @ui-lib/ui run test
pnpm --filter @ui-lib/utils run build
pnpm --filter @ui-lib/playground run dev
```

## 构建产物

### `@ui-lib/utils`

构建后输出：

- `dist/index.mjs`
- `dist/index.cjs`
- `dist/index.d.ts`

### `@ui-lib/ui`

构建后输出：

- `dist/index.mjs`
- `dist/index.cjs`
- `dist/index.d.ts`
- `dist/styles.css`

对外入口：

- `@ui-lib/ui`
- `@ui-lib/ui/styles.css`

## 发布流程

### 前置条件

在执行版本升级或真实发布前，需要先满足以下条件：

1. 仓库已经初始化 `git`
2. 当前分支工作区干净，避免把未确认改动带进版本流程
3. 已完成 `pnpm lint && pnpm test && pnpm build && pnpm typecheck`
4. 已完成 npm 登录，具备目标 scope 的发布权限

### 1. 发布前检查

```bash
pnpm release:publish:dry
```

该命令会对 `packages/*` 下的可发布包执行 `npm pack --dry-run`，用于确认：

- 包内容是否完整
- `files` / `exports` / `types` 是否正确
- 发布产物是否已经生成

### 2. 升级版本

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

### 3. 正式发布

```bash
pnpm release:publish
```

该命令会基于已经写入版本号的包执行 `lerna publish from-package`。

适用场景：

- 已完成版本提升
- 已完成构建
- 已确认 npm 权限和 registry 配置

## 包内开发约定

### `@ui-lib/ui`

- 组件通过统一 class 规范管理结构、状态和变体
- 主题覆盖通过 `ThemeProvider` 注入 CSS Variables
- 组件内部尽量不依赖大量内联样式

### `@ui-lib/utils`

- 保持纯函数和通用工具定位
- 不引入 React 依赖
- 可被 `ui` 和 `playground` 直接复用

## 当前已提供内容

### `@ui-lib/ui`

- `Button`
- `Input`
- `ThemeProvider`
- `ThemeOverrides`

### `@ui-lib/utils`

- `cx`
- `clamp`
- `isNil`

## 后续可扩展方向

- 增加更多基础组件
- 扩展暗色主题和品牌主题
- 补充 Storybook 或文档站
- 接入 CI、自动化版本发布和 npm registry 配置
