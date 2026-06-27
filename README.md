# Skript Blockly

一个基于 Blockly 的 Skript 可视化编程工具，让用户通过拖拽积木块的方式来编写 Skript 脚本。

## ✨ 特性

- 🎨 **可视化编程**: 通过拖拽积木块编写 Skript 脚本，无需手写代码
- 🌐 **多语言支持**: 支持中英文界面（Vue I18n）
- 💾 **工作区管理**: 支持多个工作区、IndexedDB 自动保存、导入导出文件
- 🔍 **智能搜索**: 积木块搜索功能，支持模糊搜索
- 📋 **代码生成**: 将可视化积木块转换为 Skript 代码，带生成信息头
- 🎯 **语法类型系统**: 支持 Skript 的 8 种语法类型（事件、条件、效果、表达式、类型、函数、节、结构）
- 🎨 **主题定制**: SkriptHub 风格的自定义 Blockly 主题
- 📦 **状态管理**: Pinia 状态管理，支持工作区和主题状态
- ⌨️ **快捷键支持**: Ctrl+S 保存等便捷操作
- 🧩 **自定义输入字段**: 时间输入、默认文本输入等自定义字段
- 🔧 **变更跟踪**: 实时跟踪积木块数量、代码行数、保存状态

## 🚀 快速开始

### 环境要求

- Node.js ^20.19.0 或 >=22.12.0
- npm

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

### 预览生产版本

```bash
npm run preview
```

### 类型检查

```bash
npm run type-check
```

### 代码检查和格式化

```bash
npm run lint      # ESLint 代码检查并自动修复
npm run format    # Prettier 代码格式化
```

## 🛠️ 技术栈

- **前端框架**: Vue 3 (Composition API + `<script setup>`)
- **开发语言**: TypeScript
- **构建工具**: Vite
- **可视化编程**: Blockly v12
- **状态管理**: Pinia
- **路由**: Vue Router
- **国际化**: Vue I18n
- **搜索**: Fuse.js (模糊搜索)
- **拼音支持**: pinyin-pro
- **图标**: Font Awesome
- **代码高亮**: Shiki
- **代码规范**: ESLint + Prettier

## 📁 项目结构

```
skript-blockly/
├── public/                    # 静态资源
│   └── media/                # Blockly 媒体资源（音效、图标等）
├── src/
│   ├── assets/               # 静态资源
│   │   ├── main.css          # 全局样式
│   │   ├── blockly.css       # Blockly 自定义样式
│   │   ├── skript-grammar.json    # Skript 语法定义
│   │   ├── skript.syntaxlist.json # Skript 语法列表
│   │   └── syntaxlist.json        # 语法数据
│   ├── blockly/              # Blockly 核心模块
│   │   ├── blocks/           # 积木块定义
│   │   │   ├── events/       # 事件积木块
│   │   │   │   ├── SimpleEvents.ts    # 简单事件（批量注册）
│   │   │   │   ├── SkriptEventBlock.ts # 事件积木块基类
│   │   │   │   ├── AttemptAttack.ts   # 攻击尝试事件
│   │   │   │   ├── AtTime.ts          # 定时事件
│   │   │   │   ├── BeaconEffect.ts    # 信标效果事件
│   │   │   │   ├── BeaconToggle.ts    # 信标开关事件
│   │   │   │   ├── BookEdit.ts        # 书本编辑事件
│   │   │   │   ├── Block.ts           # 方块事件
│   │   │   │   ├── Cancellable.ts     # 可取消事件特性
│   │   │   │   ├── EventPriority.ts   # 事件优先级
│   │   │   │   ├── EventValues.ts     # 事件值
│   │   │   │   └── index.ts           # 事件模块出口
│   │   │   ├── types/        # 类型积木块
│   │   │   │   ├── Types.ts           # 类型定义基类
│   │   │   │   ├── Arrays.ts          # 数组类型
│   │   │   │   ├── EntityData.ts      # 实体数据类型
│   │   │   │   ├── EquipmentSlot.ts   # 装备槽类型
│   │   │   │   ├── PointEffect.ts     # 粒子效果类型
│   │   │   │   ├── World.ts           # 世界类型
│   │   │   │   └── index.ts           # 类型模块出口
│   │   │   ├── BlocklyRegistry.ts     # 积木块注册中心
│   │   │   ├── SkriptBlock.ts         # Skript 积木块基类定义
│   │   │   └── variables.ts           # 变量相关
│   │   ├── generators/       # 代码生成器
│   │   │   └── skript.ts     # Skript 代码生成器
│   │   ├── inputs/           # 自定义输入字段
│   │   │   ├── FieldDefaultTextInput.ts # 默认文本输入字段
│   │   │   └── FieldTime.ts           # 时间输入字段
│   │   ├── themes/           # Blockly 主题
│   │   │   └── skripthub.ts  # SkriptHub 风格主题
│   │   ├── utils/            # 工具函数
│   │   │   ├── SimpleMutator.ts    # 简单变更器
│   │   │   └── ToolboxSeach.ts     # 工具箱搜索
│   │   ├── config.ts         # Blockly 配置
│   │   └── toolbox.ts        # 工具箱定义
│   ├── components/           # Vue 组件
│   │   ├── blockly/          # Blockly 组件
│   │   │   └── WorkspaceComponent.vue  # 工作区组件
│   │   ├── controls/         # 通用 UI 组件
│   │   │   ├── ButtonComponent.vue
│   │   │   ├── CardComponent.vue
│   │   │   ├── ContentMenuComponent.vue
│   │   │   ├── EditTextComponent.vue
│   │   │   ├── SelectComponent.vue
│   │   │   └── TitleLogoComponent.vue
│   │   ├── HeaderComponent.vue    # 页头组件
│   │   ├── MainComponent.vue      # 主内容组件
│   │   └── FooterComponent.vue    # 页脚组件
│   ├── locales/              # 国际化
│   │   ├── i18n.ts           # i18n 配置
│   │   ├── en_us.ts          # 英文
│   │   └── zh_cn.ts          # 中文
│   ├── router/               # 路由配置
│   │   └── index.ts
│   ├── skript/               # Skript 语法处理
│   │   ├── SyntaxRegistry.ts # 语法注册系统
│   │   └── highlight.ts      # 语法高亮
│   ├── stores/               # Pinia 状态管理
│   │   ├── workspace.ts      # 工作区状态
│   │   └── theme.ts          # 主题状态
│   ├── views/                # 页面视图
│   │   └── HomeView.vue      # 首页
│   ├── App.vue               # 根组件
│   └── main.ts               # 应用入口
├── .vscode/                  # VSCode 配置
├── blockly-prune-plugin.ts   # Blockly 裁剪插件
├── syntax-marker-plugin.ts   # 语法标记插件
├── syntaxlist-plugin.ts      # 语法列表插件
├── eslint.config.ts          # ESLint 配置
├── vite.config.ts            # Vite 配置
├── tsconfig.json             # TypeScript 配置
├── package.json
└── README.md
```

## 🎯 开发状态

### 已完成功能 ✅

- **核心架构**: Vue 3 + TypeScript + Vite 项目结构
- **Blockly 集成**: Blockly v12 完整集成
- **语法注册系统**: 完整的语法注册机制，支持 8 种语法类型
- **Skript 积木块基类**: `SkriptBlock` 基类，支持扩展状态和形状更新
- **工作区管理**: IndexedDB 存储、文件导入导出、剪贴板操作
- **事件积木块**: 简单事件（批量）+ 复杂事件（AttemptAttack、AtTime、BeaconEffect、BeaconToggle、BookEdit、Block 等）
- **类型积木块**: 数组、实体数据、装备槽、粒子效果、世界等类型
- **代码生成器**: Skript 代码生成器基础框架（带生成头、注释处理）
- **自定义输入字段**: FieldDefaultTextInput、FieldTime
- **自定义主题**: SkriptHub 风格主题
- **工具箱搜索**: 积木块搜索功能
- **国际化**: 中英文界面支持
- **状态管理**: Pinia stores（workspace、theme）
- **路由**: Vue Router 集成
- **快捷键**: Ctrl+S 保存、未保存提醒

### 进行中功能 🚧

- **条件积木块**: 工具箱分类已创建，待实现具体积木块
- **效果积木块**: 工具箱分类已创建，待实现具体积木块
- **表达式积木块**: 工具箱分类已创建，待实现具体积木块
- **代码生成器**: 需要完善各语法类型的代码生成逻辑
- **类型积木块**: 基于 SyntaxRegistry 的自动注册机制待完善

### 计划功能 📋

- **函数支持**: 自定义函数的定义和调用
- **节支持**: Skript 节的可视化编辑
- **结构支持**: 复杂数据结构的可视化操作
- **代码验证**: 实时代码语法检查
- **插件系统**: 支持第三方 Skript 插件的语法扩展
- **变量系统**: 完整的变量管理
- **撤销/重做**: 历史记录管理

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

1. 从左侧工具箱选择需要的积木块分类
2. 拖拽积木块到工作区
3. 连接积木块构建脚本逻辑
4. 右键点击积木块可以添加注释

### 生成代码

1. 点击"生成代码"按钮
2. 选择输出方式：
   - 下载为 `.sk` 文件
   - 复制到剪贴板
   - 在控制台查看

### 保存和加载

- **自动保存**: 编辑时自动跟踪保存状态
- **手动保存**: Ctrl+S 或点击保存按钮（保存到 IndexedDB）
- **导出工作区**: 导出为 `.skriptblockly.json` 文件
- **导入工作区**: 从文件或剪贴板导入
- **多工作区**: 支持创建、切换、删除多个工作区

### 工作区操作

- **切换网格**: 显示/隐藏工作区网格
- **切换工具箱**: 显示/隐藏左侧工具箱
- **查看统计**: 实时显示积木块数量和代码行数

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 开发规范

- 使用 TypeScript 编写代码
- 使用 Vue 3 Composition API 和 `<script setup>` 语法
- 遵循 ESLint 和 Prettier 配置
- 为新功能添加必要的类型定义
- 保持代码风格一致
- 提交前运行 `npm run lint` 和 `npm run type-check`

## 📝 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🔗 相关链接

- [Skript 官方文档](https://docs.skriptlang.org/)
- [SkriptHub](https://skripthub.net/)
- [Blockly 官方文档](https://developers.google.com/blockly)
- [Vue 3 文档](https://vuejs.org/)
- [Vite 文档](https://vitejs.dev/)
- [Pinia 文档](https://pinia.vuejs.org/)

## 📮 联系方式

- 项目主页: https://superkripts.github.io/blockly/
- GitHub: https://github.com/SuperKripts/skript-blockly/

---

**注意**: 本项目正在积极开发中，部分功能可能不完整或存在 bug。欢迎反馈问题和建议！
