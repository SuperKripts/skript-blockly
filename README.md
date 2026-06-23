# Skript Blockly

一个基于 Blockly 的 Skript 可视化编程工具，让用户通过拖拽积木块的方式来编写 Skript 脚本。

## ✨ 特性

- 🎨 **可视化编程**: 通过拖拽积木块编写 Skript 脚本，无需手写代码
- 🌐 **多语言支持**: 支持中英文界面
- 💾 **工作区管理**: 支持多个工作区、自动保存、导入导出
- 🔍 **智能搜索**: 支持积木块搜索，包括中文拼音搜索
- 📋 **代码生成**: 将可视化积木块转换为 Skript 代码
- 🎯 **语法支持**: 支持 Skript 的 8 种语法类型（事件、条件、效果、表达式、类型、函数、节、结构）
- 🎨 **主题定制**: 自定义 Blockly 主题和样式

## 🚀 快速开始

### 环境要求

- Node.js ^20.19.0 或 >=22.12.0
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173 查看应用

### 构建生产版本

```bash
npm run build
```

### 代码检查和格式化

```bash
npm run lint      # ESLint 代码检查
npm run format    # Prettier 代码格式化
```

## 🛠️ 技术栈

- **前端框架**: Vue 3 (Composition API)
- **开发语言**: TypeScript
- **构建工具**: Vite
- **可视化编程**: Blockly
- **状态管理**: Pinia
- **路由**: Vue Router
- **国际化**: Vue I18n
- **搜索**: Fuse.js (模糊搜索), pinyin-pro (中文拼音搜索)

## 📁 项目结构

```
src/
├── assets/              # 静态资源
│   ├── main.css        # 全局样式
│   ├── blockly.css     # Blockly 样式
│   └── syntaxlist.json # Skript 语法数据
├── blockly/            # Blockly 相关代码
│   ├── blocks/         # 自定义积木块定义
│   │   ├── events/     # 事件积木块
│   │   ├── effects/    # 效果积木块
│   │   ├── types/      # 类型积木块
│   │   └── inputs/     # 自定义输入字段
│   ├── generators/     # 代码生成器
│   ├── themes/         # Blockly 主题
│   ├── utils/          # 工具函数
│   ├── config.ts       # Blockly 配置
│   └── toolbox.ts      # 工具箱定义
├── components/         # Vue 组件
│   ├── blockly/        # Blockly 工作区组件
│   ├── controls/       # 通用 UI 组件
│   └── layout/         # 布局组件
├── locales/            # 国际化文件
│   ├── en_us.ts        # 英文
│   └── zh_cn.ts        # 中文
├── skript/             # Skript 语法处理
│   ├── SyntaxRegistry.ts  # 语法注册系统
│   └── highlight.ts        # 语法高亮
├── stores/             # Pinia 状态管理
│   └── workspace.ts    # 工作区状态
├── views/              # 页面视图
└── main.ts             # 应用入口
```

## 🎯 开发状态

### 已完成功能 ✅

- **核心架构**: Vue 3 + TypeScript + Vite 项目结构
- **语法注册系统**: 完整的语法注册机制，支持 8 种语法类型
- **工作区管理**: IndexedDB 存储、文件导入导出、剪贴板操作
- **事件处理**: 约 120 个简单事件 + 9 个复杂事件
- **类型系统**: 丰富的类型定义（魔咒、药水效果、生物群系等）
- **代码生成器**: 基础框架和部分实现
- **国际化**: 中英文界面支持
- **搜索功能**: 积木块搜索和拼音搜索

### 进行中功能 🚧

- **效果积木块**: 需要注册更多效果类型
- **条件积木块**: 需要实现条件类型的积木块
- **表达式积木块**: 需要实现表达式类型的积木块
- **代码生成器**: 需要完善各语法类型的代码生成逻辑

### 计划功能 📋

- **函数支持**: 自定义函数的定义和调用
- **节支持**: Skript 节的可视化编辑
- **结构支持**: 复杂数据结构的可视化操作
- **代码验证**: 实时代码语法检查
- **插件系统**: 支持第三方 Skript 插件的语法扩展

## 🧩 Skript 语法类型

项目支持以下 Skript 语法类型：

1. **事件 (Event)**: 触发脚本执行的事件，如 `on join`, `on death`
2. **条件 (Condition)**: 逻辑判断，如 `if player has permission`
3. **效果 (Effect)**: 执行的操作，如 `send "Hello" to player`
4. **表达式 (Expression)**: 返回值的表达式，如 `player's health`
5. **类型 (Type)**: 数据类型，如 `player`, `location`, `text`
6. **函数 (Function)**: 自定义函数
7. **节 (Section)**: 脚本节
8. **结构 (Structure)**: 复杂数据结构

## 💡 使用指南

### 创建工作区

1. 点击工具栏的"新建工作区"按钮
2. 输入工作区名称
3. 开始拖拽积木块进行编程

### 编写脚本

1. 从左侧工具箱选择需要的积木块
2. 拖拽到工作区
3. 连接积木块构建脚本逻辑
4. 右键点击积木块可以添加注释

### 生成代码

1. 点击"生成代码"按钮
2. 选择输出方式：
   - 下载为 `.sk` 文件
   - 复制到剪贴板
   - 在控制台查看

### 保存和加载

- **自动保存**: 编辑时自动保存到浏览器
- **手动保存**: Ctrl+S 或点击保存按钮
- **导出工作区**: 导出为 `.skriptblockly.json` 文件
- **导入工作区**: 从文件或剪贴板导入

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 开发规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 和 Prettier 配置
- 为新功能添加必要的类型定义
- 保持代码风格一致

## 📝 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🔗 相关链接

- [Skript 官方文档](https://docs.skriptlang.org/)
- [SkriptHub](https://skripthub.net/)
- [Blockly 官方文档](https://developers.google.com/blockly)
- [Vue 3 文档](https://vuejs.org/)
- [Vite 文档](https://vitejs.dev/)

## 📮 联系方式

- 项目主页: https://superkripts.github.io/blockly/
- GitHub: https://github.com/SuperKripts/skript-blockly/

---

**注意**: 本项目正在积极开发中，部分功能可能不完整或存在 bug。欢迎反馈问题和建议！
