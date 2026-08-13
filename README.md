# Skript Blockly

基于 Blockly 的 Skript 可视化编程平台。用户通过拖拽积木块编写 Skript 脚本，平台自动生成可执行的 `.sk` 代码。

## 快速开始

```bash
npm install        # 安装依赖
npm run dev        # 开发模式 → http://localhost:5173
npm run build      # 生产构建
npm run type-check # 类型检查
npm run lint       # ESLint 修复
```

**环境要求**：Node.js ^20.19.0 或 >=22.12.0

## 技术栈

| 层级   | 技术                                         |
| ---- | ------------------------------------------ |
| 前端框架 | Vue 3 (Composition API + `<script setup>`) |
| 语言   | TypeScript                                 |
| 构建工具 | Vite                                       |
| 积木引擎 | Blockly v12                                |
| 状态管理 | Pinia                                      |
| 国际化  | Vue I18n                                   |
| 模糊搜索 | Fuse.js + pinyin-pro                       |
| 代码高亮 | Shiki                                      |
| 图标   | Font Awesome                               |

***

## 架构概览

项目分为三层：

```
┌─────────────────────────────────────────────────────────┐
│  Vue 层（UI / 交互）                                      │
│  App.vue → HomeView → Header / Main / Footer             │
│  Stores: workspace.ts / dialog.ts / theme.ts             │
│  Components: controls/ + blockly/                        │
├─────────────────────────────────────────────────────────┤
│  Blockly 层（积木引擎）                                   │
│  config.ts → toolbox.ts → BlocklyRegistry                │
│  blocks/ → generators/ → inputs/ → utils/                │
├─────────────────────────────────────────────────────────┤
│  构建层（Vite 插件）                                      │
│  syntax-marker-plugin（自动生成 index.ts）                │
│  syntaxlist-plugin（语法数据压缩）                        │
│  blockly-prune-plugin（移除 Blockly 默认语言包）           │
└─────────────────────────────────────────────────────────┘
```

### 数据流

```
用户拖拽积木 → Blockly Workspace 状态变更
  → workspace.ts (Pinia) 跟踪 isSaved / blockCount / state
  → 用户点击"生成代码"
  → SkriptCodeGenerator.workspaceToCode(workspace)
  → 生成 Skript 代码 → CodePreviewComponent 高亮显示
```

***

## 目录结构

```
src/
├── main.ts                     # 应用入口，初始化 Pinia / Router / i18n
├── App.vue                     # 根组件（仅 RouterView）
├── views/
│   └── HomeView.vue            # 首页：Header + Main + Footer + Dialog
│
├── components/
│   ├── HeaderComponent.vue     # 顶部工具栏（保存/加载/生成代码/移动端菜单）
│   ├── MainComponent.vue       # 主内容区（工作区卡片）
│   ├── FooterComponent.vue     # 底部状态栏（积木数/代码行数/主题切换）
│   ├── controls/               # 通用 UI 组件
│   │   ├── ButtonComponent.vue
│   │   ├── CardComponent.vue
│   │   ├── ContentMenuComponent.vue   # 右键上下文菜单
│   │   ├── EditTextComponent.vue       # 点击编辑文本
│   │   ├── CodePreviewComponent.vue    # Shiki 代码高亮预览
│   │   ├── ModalDialogComponent.vue    # alert/confirm/prompt 对话框
│   │   ├── SelectComponent.vue         # 语言选择下拉
│   │   └── TitleLogoComponent.vue      # Logo + 构建信息
│   └── blockly/
│       ├── WorkspaceComponent.vue      # Blockly 注入容器
│       └── fields/                     # Blockly Field 对应的 Vue 组件
│           ├── SearchDropdownComponent.vue
│           ├── BlockDataComponent.vue
│           └── TimespanPickerComponent.vue
│
├── stores/
│   ├── workspace.ts            # 工作区状态 + IndexedDB 持久化 + 文件/剪贴板 I/O
│   ├── dialog.ts               # 全局对话框状态（alert/confirm/prompt）
│   └── theme.ts                # 暗色/亮色主题
│
├── blockly/                    # Blockly 核心模块
│   ├── config.ts               #   注入配置 + 全局注册（dialog/快捷键）
│   ├── toolbox.ts              #   工具箱分类定义
│   │
│   ├── blocks/                 #   所有积木块定义
│   │   ├── SkriptBlock.ts      #     核心抽象：SkriptBlock 类型系统
│   │   ├── BlocklyRegistry.ts  #   注册聚合出口
│   │   ├── variables.ts        #   变量块代码生成
│   │   ├── events/             #   事件块
│   │   │   ├── SkriptEventBlock.ts  # 事件块抽象 + 工厂方法
│   │   │   ├── EventValues.ts       # event-value 表达式块
│   │   │   ├── Cancellable.ts       # cancel event 效果块
│   │   │   ├── EventPriority.ts     # 事件优先级常量
│   │   │   ├── SimpleEvents.ts      # 批量简单事件注册
│   │   │   └── index.ts             # 【自动生成】
│   │   ├── conditions/         #   条件块
│   │   ├── effects/            #   效果块
│   │   ├── expressions/       #   表达式块
│   │   ├── sections/           #   片段块（if/loop/while/for）
│   │   ├── structures/         #   结构块（Event/Command 容器）
│   │   ├── types/              #   类型块（entity/biome/enchantment 等）
│   │   │   ├── Types.ts        #     类型系统 + 字段工厂 + 缓存
│   │   │   ├── BlockDataParams.ts  # 方块数据参数表
│   │   │   ├── Materials.ts    #   物品/方块类型数据
│   │   │   └── index.ts       #     【自动生成】
│   │   └── variables/          #   变量工具箱扩展
│   │
│   ├── generators/
│   │   └── skript.ts           #   SkriptCodeGenerator 代码生成器
│   │
│   ├── inputs/                 #   自定义字段
│   │   ├── FieldBase.ts        #     抽象基类（Vue 组件嵌入 Blockly Field）
│   │   ├── FieldSearchDropdown.ts   # 搜索下拉（Fuse.js + 拼音）
│   │   ├── FieldBlockData.ts   #     方块数据选择器
│   │   ├── FieldTime.ts        #     时间输入（HTML time input）
│   │   ├── FieldTimespan.ts    #     时间跨度选择器
│   │   └── FieldDefaultTextInput.ts # 带默认值占位文本输入
│   │
│   ├── themes/
│   │   └── skripthub.ts        #   SkriptHub 主题（各语法类型颜色）
│   │
│   └── utils/
│       ├── SkriptConnectionChecker.ts  # 连接检查器
│       ├── ToolboxSearch.ts     #   工具箱搜索（BlockSearcher）
│       ├── FieldSearchCache.ts  #   搜索缓存（Fuse.js 索引 + 拼音）
│       └── SimpleMutator.ts    #   简易 Mutator 工具
│
├── locales/
│   ├── i18n.ts                 # i18n 配置 + pte 模板引擎
│   ├── zh_cn.ts                # 中文翻译
│   └── en_us.ts                # 英文翻译
│
├── router/index.ts             # 路由（单页 HomeView）
└── skript/
    ├── highlight.ts            # Shiki 语法高亮（Skript grammar）
    └── SyntaxRegistry.ts       # 语法注册系统
```

根目录的 Vite 插件：

```
├── syntax-marker-plugin.ts    # 自动生成各分类目录的 index.ts
├── syntaxlist-plugin.ts       # 压缩 SkriptHub 语法列表 JSON
└── blockly-prune-plugin.ts    # 移除 Blockly 默认英文语言包
```

***

## 核心抽象

### SkriptBlock 类型系统（`blockly/blocks/SkriptBlock.ts`）

所有积木块的基础类型，扩展 `Blockly.BlockSvg`。

#### 语法类型

```typescript
type SyntaxType = 'event' | 'condition' | 'effect' | 'expression' | 'type' | 'function' | 'section' | 'structure'
```

#### 块定义接口

```typescript
type SkriptBlockDefinition = {
  init: (this: SkriptBlock) => void // 初始化入口
  initShape_: (this: SkriptBlock) => void // 创建输入和字段
  initStyle_: (this: SkriptBlock) => void // 设置连接类型
  updateShape_: (this: SkriptBlock) => void // 响应状态变化更新外观
  saveExtraState: () => SkriptBlockExtraState // 序列化
  loadExtraState: (state) => void // 反序列化
  compose?: (topBlock) => void // Mutator 合并
  decompose?: (workspace) => Blockly.Block // Mutator 拆分
}
```

#### init 生命周期

`createSkriptDefinition()` 的 `init` 按顺序执行：

```
init()
 ├── initShape_()      → 子类创建输入和字段
 ├── setStyle()        → 根据语法类型设置颜色
 ├── initStyle_()      → 子类设置连接类型
 ├── setTooltip()      → 设置提示
 ├── setHelpUrl()      → 设置帮助链接
 └── updateShape_()    → 根据初始状态更新外观
```

#### 工厂方法

```typescript
// 创建基础块定义
createSkriptDefinition(syntax: { title, syntaxType, docUrl }): SkriptBlockDefinition

// 注册右键菜单"获取XX块"选项
registerContentMenuGetOption(id, weight, blockKey, supportedBlock, displayTextKey)
```

***

### SkriptEventBlock（`blockly/blocks/events/SkriptEventBlock.ts`）

事件块扩展，增加 `cancellable_` 和 `eventValues_` 属性。

```typescript
type SkriptEventBlock = SkriptBlock & {
  cancellable_: boolean // 是否可取消
  eventValues_: string[] // 可用的 event-value 列表
}
```

#### 事件块工厂

```typescript
// 注册简单事件（描述为纯文本，代码为静态字符串）
registerSimpleEvent(option: SimpleEventOptions): BlockInfo

// 注册事件（描述可为函数动态构建输入，代码可为函数动态生成）
registerEasyEvent(option: EasyEventOptions): BlockInfo
```

#### 事件块结构

```
┌───────────────────────────────────┐
│  on click:                        │  ← desc（initShape_ 构建）
│  ┌───────────────────────────────┐│
│  │  （statement input: 'block'） ││  ← 事件体（initStyle_ 创建）
│  └───────────────────────────────┘│
└───────────────────────────────────┘
     ↑ previousStatement: 'event'
```

事件块只能放在 `structure_event` 块的 `event` 输入中。

***

### SkriptCodeGenerator（`blockly/generators/skript.ts`）

```typescript
class SkriptCodeGenerator extends Blockly.Generator {
  INDENT = '    '

  // 拼接代码片段，自动跳过空值
  // codeJoin('on', 'click', ['on', target], ['with', item])
  // → "on click on {target} with {item}"
  static codeJoin(...codes: (string | string[])[]): string

  // 数组拼接（Skript 语法: "a, b and c"）
  static arrayJoin(codes: string[], quote?: boolean): string
}

// 代码优先级
const Order = { ATOMIC: 0, EXPRESSION: 1, EFFECT: 2, NONE: 99 }
```

#### 代码生成注册

```typescript
// 表达式块返回 [code, order]
generator.forBlock['expression_ai'] = (block, gen) => {
  const entity = gen.valueToCode(block, 'entity', Order.ATOMIC)
  return [`ai of ${entity}`, Order.ATOMIC]
}

// 语句块返回 string
generator.forBlock['event_click'] = (block, gen) => {
  const code = gen.codeJoin('on', 'click')
  return `${code}: \n${gen.statementToCode(block, 'block')}`
}
```

***

### SkriptConnectionChecker（`blockly/utils/SkriptConnectionChecker.ts`）

在 Blockly 默认检查之上增加 Skript 特有约束：

| 检查场景    | 规则                                                                |
| ------- | ----------------------------------------------------------------- |
| 类型兼容    | `livingentity` 输出可连接 `entity` / `player` 输入                       |
| 精确匹配    | `event` / `condition` 类型不允许弱匹配                                    |
| 条件块包装   | `if_conditions` / `elseif_*_conditions` 输入只接受 `condition_wrapper` |
| 取消事件    | `effect_cancel_event` 只在 `cancellable_` 为 true 的事件块内允许            |
| 事件值     | `expression_event_value` 只在该事件 `eventValues_` 包含对应值时允许            |
| 事件限制表达式 | 有 `supportedEvents_` 属性的块只在对应事件类型内允许                              |

***

## Block 注册流程

### 自动注册机制

项目使用 `syntax-marker-plugin`（Vite 插件）自动生成 `index.ts`，开发者**无需手动维护导入语句**。

```
1. 创建块文件（如 events/MyEvent.ts），首行标记 'skript syntax'
2. 导出 register() 返回 BlockInfo（或 registerAll() 返回 BlockInfo[]）
3. syntax-marker-plugin 自动扫描，生成 index.ts（导入 + 调用 + 聚合）
4. BlocklyRegistry.ts 汇总各分类的 BlockInfos 数组
5. toolbox.ts 引用 BlocklyRegistry 构建工具箱
```

### `'skript syntax'` 标记

每个块定义文件**必须**以以下内容开头：

```typescript
'skript syntax'
```

- 开发环境下由 `syntax-marker-plugin` 检测，触发自动 index 生成
- 生产构建时插件自动移除该标记（零运行时开销）

### 自动生成的 index.ts

插件扫描目录后自动生成，**请勿手动编辑**：

```typescript
// 【自动生成】
import * as Blockly from 'blockly/core'
import { register as register_Click } from './Click.ts'
import { registerAll as registerAll_Block } from './Block.ts'

export const BlockInfos: Blockly.utils.toolbox.BlockInfo[] = []

function register() {
  BlockInfos.push(register_Click(), ...registerAll_Block())
}

register()
```

### BlocklyRegistry 聚合出口

`BlocklyRegistry.ts` 导入各分类的 `BlockInfos` 并重新导出，供 `toolbox.ts` 使用。

***

## 如何新增积木块

### 通用步骤

1. 在对应分类目录下创建 `.ts` 文件
2. 文件首行写 `'skript syntax'`
3. 导出 `register()` 函数（多块用 `registerAll()`）
4. 在 `zh_cn.ts` 和 `en_us.ts` 中添加翻译
5. 保存文件，`index.ts` 会自动生成，块自动出现在工具箱中

**无需修改任何 index.ts 或注册中心文件。**

***

### 示例 1：简单事件块

最简单的事件——描述为纯文本，代码为静态字符串。

```typescript
// src/blockly/blocks/events/MyEvent.ts
'skript syntax'

import * as Blockly from 'blockly/core'
import { registerSimpleEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_my_event'

const syntax: EventSyntax = {
  title: 'My Event',
  docId: 1234, // SkriptHub 文档 ID
  eventValues: ['event-player', 'event-world'], // 可用的 event-value
  cancellable: false,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerSimpleEvent({
    ...syntax,
    blockKey,
    desc: 'EVENT_MY_EVENT_DESC', // i18n key，纯文本
    code: 'on my event', // 静态代码
  })
}
```

翻译（`zh_cn.ts`）：

```typescript
export const EVENT_MY_EVENT_DESC = '当我的事件触发'
export const EVENT_MY_EVENT = '我的事件'
```

***

### 示例 2：带输入的事件块

需要下拉选择、值输入等交互的事件。

```typescript
// src/blockly/blocks/events/MyComplexEvent.ts
'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createFieldDropdown, createTempFieldDropdown } from '../types/Types'
import { Entities } from '../types/Entities'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_my_complex_event'

const syntax: EventSyntax = {
  title: 'My Complex Event',
  docId: 5678,
  eventValues: ['event-player', 'event-entity'],
  cancellable: true,
}

const modes = ['mode_a', 'mode_b']

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      // pte 解析带占位符的翻译文本
      // 翻译文本: "EVENT_MY_COMPLEX_EVENT_DESC": "当 %0 %1 时"
      pte('EVENT_MY_COMPLEX_EVENT_DESC', {
        0: () => input.appendField(createTempFieldDropdown('event_my_complex_event', modes), 'mode'),
        1: () => input.appendField(createFieldDropdown(Entities, false), 'entity'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const mode = block.getFieldValue('mode')
      const entity = block.getFieldValue('entity')
      const statement = generate.statementToCode(block, 'block')
      const code = generate.codeJoin('on', mode, ['by', entity])
      return `${code}: \n${statement}`
    },
  })
}
```

翻译：

```typescript
export const EVENT_MY_COMPLEX_EVENT_DESC = '当 %0 由 %1 时'
export const FIELD_OPTION_EVENT_MY_COMPLEX_EVENT_MODE_A = '模式A'
export const FIELD_OPTION_EVENT_MY_COMPLEX_EVENT_MODE_B = '模式B'
```

***

### 示例 3：效果块

效果块有 previous/next 连接，可以串行执行。

```typescript
// src/blockly/blocks/effects/MyEffect.ts
'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptDefinition, getSkriptHubDocUrl, type SkriptBlock, type SkriptBlockDefinition, type Syntax } from '../SkriptBlock'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'
import { pte } from '@/locales/i18n'

const blockKey = 'effect_my_effect'

const syntax: Syntax = {
  title: 'My Effect',
  syntaxType: 'effect',
  docUrl: getSkriptHubDocUrl(9012),
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition(syntax)
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      this.setInputsInline(true)
      pte('EFFECT_MY_EFFECT_DESC', {
        0: () => this.appendValueInput('target').setCheck('entity'),
        1: () => this.appendValueInput('amount').setCheck('number'),
        default: ({ msg, index }) => this.appendDummyInput().appendField(msg, 'part-' + index),
      })
    },
    // initStyle_ 不需要覆盖，createSkriptDefinition 已为 effect 设置 previous/next
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)

  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    const target = generate.valueToCode(block, 'target', 0) || 'entity'
    const amount = generate.valueToCode(block, 'amount', 0) || '1'
    return generate.codeJoin('do something to', target, [amount, 'times'])
  }

  // blockxml 可选：定义默认 shadow block
  return {
    kind: 'block',
    blockxml: `<block type="${blockKey}"><value name="amount"><shadow type="type_number"><field name="number">1</field></shadow></value></block>`,
  }
}
```

***

### 示例 4：表达式块

表达式块有 output 连接，返回一个值。

```typescript
// src/blockly/blocks/expressions/MyExpression.ts
'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptDefinition, getSkriptHubDocUrl, type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { pte } from '@/locales/i18n'
import { generator, Order } from '@/blockly/generators/skript'

const blockKey = 'expression_my_value'

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({
    syntaxType: 'expression',
    title: 'My Value',
    docUrl: getSkriptHubDocUrl(3456),
  })
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      this.setInputsInline(true)
      pte('EXPRESSION_MY_VALUE_DESC', {
        0: () => this.appendValueInput('entity').setCheck('livingentity'),
        default: ({ msg, index }) => this.appendDummyInput().appendField(msg, 'part-' + index),
      })
    },
    initStyle_(this: SkriptBlock) {
      this.setOutput(true, 'number') // 输出类型决定连接兼容性
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)

  // 表达式块返回 [code, order]
  generator.forBlock[blockKey] = (block, gen) => {
    const entity = gen.valueToCode(block, 'entity', Order.ATOMIC) || 'entity'
    return [`my value of ${entity}`, Order.ATOMIC]
  }

  return { kind: 'block', type: blockKey }
}
```

#### 事件限制表达式

某些表达式只能在特定事件内使用（如 `event-value` 只在对应事件内可用）：

```typescript
const mixin: Partial<SkriptBlockDefinition> = {
  initShape_() {
    // 在 extra_ 中设置 supportedEvents_，SkriptConnectionChecker 会自动检查
    this.extra_ = { supportedEvents_: ['event_click', 'event_damage'] }
    // ... 创建输入
  },
  initStyle_() {
    this.setOutput(true, 'number')
  },
}
```

***

### 示例 5：类型块

类型块是最简单的块，提供一个可搜索的下拉选择。

```typescript
// src/blockly/blocks/types/MyTypes.ts
'skript syntax'

import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

// 定义类型
export const MyTypes: SkriptType = {
  name: 'my_type', // 类型标识符
  type: 'mytype', // Blockly 连接检查类型
  options: ['option_a', 'option_b', 'option_c'],
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  // createTypeBlock 自动创建一个输出块 + 搜索下拉 + 代码生成
  return createTypeBlock(MyTypes, 'My Types', 0)
}
```

翻译（选项的翻译 key 格式为 `TYPE_{name}_{value}`）：

```typescript
export const TYPE_MY_TYPE_OPTION_A = '选项A'
export const TYPE_MY_TYPE_OPTION_B = '选项B'
export const TYPE_MY_TYPE_OPTION_C = '选项C'
```

> `createTypeBlock` 会根据选项数量自动选择字段类型：
>
> - < 9 个选项 → `FieldDropdown`（普通下拉）
> - ≤ 30 个选项 → `FieldGridDropdown`（网格下拉）
> - \> 30 个选项 → `FieldSearchDropdown`（搜索下拉）

***

### 示例 6：批量简单事件

当有大量结构相同的简单事件时，使用 `registerAll` 批量注册。

```typescript
// src/blockly/blocks/events/MyBatchEvents.ts
'skript syntax'

import * as Blockly from 'blockly/core'
import { registerSimpleEvent } from './SkriptEventBlock'

type SimpleEventInfo = {
  key: string
  code?: string // 可选，默认为 'on ' + key.replace(/_/g, ' ')
  title: string
  eventValues: string[]
  cancellable: boolean
  docId: number
}

const events: SimpleEventInfo[] = [
  {
    key: 'event_a',
    title: 'Event A',
    eventValues: ['event-player'],
    cancellable: false,
    docId: 1001,
  },
  {
    key: 'event_b',
    title: 'Event B',
    eventValues: ['event-entity', 'event-world'],
    cancellable: true,
    docId: 1002,
  },
]

export function registerAll(): Blockly.utils.toolbox.BlockInfo[] {
  return events.map((info) => {
    return registerSimpleEvent({
      title: info.title,
      blockKey: 'event_' + info.key,
      docId: info.docId,
      desc: 'EVENT_' + info.key.toUpperCase() + '_DESC',
      code: info.code ?? 'on ' + info.key.replace(/_/g, ' '),
      eventValues: info.eventValues,
      cancellable: info.cancellable,
    })
  })
}
```

***

### 示例 7：带 Mutator 的片段块

使用 `SimpleMutator` 工具创建可动态增删预设项的块。

```typescript
// src/blockly/blocks/sections/MySection.ts
'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptDefinition, type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'
import { SimpleMutator, type MutatorPreset } from '@/blockly/utils/SimpleMutator'
import { t } from '@/locales/i18n'

const blockKey = 'section_my_section'

// 定义预设项
const presets: MutatorPreset<string>[] = [
  { id: 'preset_a', desc: 'PRESET_A_DESC', input: false, value: 'option_a' },
  { id: 'preset_b', desc: 'PRESET_B_DESC', input: true }, // 带输入框
]

// 创建 mutator 实例
const mutator = new SimpleMutator<string>({
  topBlockId: blockKey + '_mutator',
  topBlockDesc: 'MY_SECTION_MUTATOR_TITLE',
  fieldName: 'value',
  multiple: true,
})

// 注册预设块
presets.forEach((p) => {
  if (p.input) {
    mutator.registerInputPresetBlock(p.id, p.desc, () => new Blockly.FieldTextInput('') as Blockly.Field<string>)
  } else {
    mutator.registerPresetBlock(p.id, p.desc, p.value!)
  }
})

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({
    title: 'My Section',
    syntaxType: 'section',
    docUrl: 'https://skriptlang.org/docs/',
  })
  const mixin: Partial<SkriptBlock> = {
    initShape_() {
      this.appendDummyInput().appendField(t('MY_SECTION_TITLE'))
      this.setMutator(mutator.createMutator(this))
    },
    decompose(workspace) {
      // 从块状态创建 mutator 顶层块
      return mutator.createTopBlock(workspace, this.extra_.items ?? [])
    },
    compose(topBlock) {
      // 从 mutator 提取值并更新块
      this.extra_.items = mutator.extractValues(topBlock)
      this.updateShape_()
    },
    updateShape_() {
      // 根据 extra_.items 更新块外观
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)

  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    // 生成代码
    return 'generated code'
  }

  return { kind: 'block', type: blockKey }
}
```

***

### 示例 8：结构块

结构块是容器，如 `structure_event`（事件容器）和 `structure_command`（命令容器）。

```typescript
// src/blockly/blocks/structures/MyStructure.ts
'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptDefinition, type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'
import { t } from '@/locales/i18n'

const blockKey = 'structure_my_structure'

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({
    title: 'My Structure',
    syntaxType: 'structure',
    docUrl: 'https://skriptlang.org/docs/',
  })
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_() {
      this.appendDummyInput().appendField(t('MY_STRUCTURE_TITLE'))
    },
    initStyle_() {
      // 结构块通过 statement input 接受其他块
      this.appendStatementInput('content').setCheck('event')
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)

  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    const content = generate.statementToCode(block, 'content')
    return content
  }

  return { kind: 'block', type: blockKey }
}
```

***

## pte 模板引擎

事件描述使用 `pte`（来自 `@/locales/i18n`）解析带占位符的翻译文本，实现动态字段插入。

### 工作原理

翻译文本中的 `%N`（N 为数字）是占位符，`pte` 会按顺序解析：

```typescript
// 翻译文本: "EVENT_CLICK_DESC": "on %0 click %1 with %2"
pte('EVENT_CLICK_DESC', {
  0: () => input.appendField(createTempFieldDropdown('click_type', ['', 'left', 'right']), 'click_type'),
  1: () => input.appendField(createFieldSearchDropdown(EntitiesItemBlock, true), 'click_target'),
  2: () => input.appendField(createFieldDropdown(ItemTypes, true), 'used_item'),
  default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
})
```

- `%0` → 调用 handler `0`，插入下拉字段
- `%1` → 调用 handler `1`，插入搜索下拉字段
- `%2` → 调用 handler `2`，插入下拉字段
- 普通文本 → 调用 `default` handler，作为文本字段插入

`%0` 的位置还用于 `FieldSearchDropdown` 的插入（事件描述翻译中的 `%0` 占位符）。

***

## 自定义字段系统

### FieldBase 抽象基类（`blockly/inputs/FieldBase.ts`）

在 Blockly Field 中嵌入 Vue 组件的基类：

```
FieldBase<T> extends Blockly.Field<T>
  ├── vueComponent_(): Component     [abstract] 返回 Vue 组件
  ├── vueProps(): Record             [abstract] 返回 props
  ├── createApp_(): App              创建 Vue 应用，注入事件回调
  ├── showEditor_()                  挂载到 DropDownDiv
  └── disposeEditor_()              卸载 Vue 应用
```

事件回调（基类统一处理）：

- `onResize` → 重新定位 DropDownDiv
- `onSelect(value)` → setValue + 重新定位
- `onClose` → 隐藏 DropDownDiv
- `onSelectAndClose(value)` → setValue + 隐藏

**继承 FieldBase 的字段**：`FieldBlockData`、`FieldTimespan`

### 字段列表

| 字段类                     | 继承自                         | 用途               |
| ----------------------- | --------------------------- | ---------------- |
| `FieldBase<T>`          | `Blockly.Field<T>`          | 抽象基类（Vue 嵌入）     |
| `FieldSearchDropdown`   | `Blockly.FieldDropdown`     | Fuse.js 模糊搜索下拉   |
| `FieldBlockData`        | `FieldBase<BlockDataState>` | 方块数据选择器          |
| `FieldTimespan`         | `FieldBase<string>`         | 时间跨度选择器          |
| `FieldTime`             | `Blockly.FieldTextInput`    | HTML5 time input |
| `FieldDefaultTextInput` | `Blockly.FieldTextInput`    | 带翻译默认值占位         |

### 字段工厂函数（`blockly/blocks/types/Types.ts`）

```typescript
// 根据选项数量自动选择字段类型
createFieldDropdown(type: SkriptType, withEmpty?: boolean): Blockly.Field
// < 9 → FieldDropdown, ≤ 30 → FieldGridDropdown, > 30 → FieldSearchDropdown

// 始终使用搜索下拉
createFieldSearchDropdown(type: SkriptType, withEmpty?: boolean): FieldSearchDropdown

// 临时下拉（用于模式选择等）
createTempFieldDropdown(name: string, args: string[]): Blockly.Field
```

***

## 翻译系统

### 翻译文件

- `src/locales/zh_cn.ts` — 中文翻译
- `src/locales/en_us.ts` — 英文翻译
- `src/locales/i18n.ts` — i18n 配置 + `pte` 模板引擎

### 翻译 key 命名规则

| 场景          | 格式                            | 示例                                    |
| ----------- | ----------------------------- | ------------------------------------- |
| 类型选项        | `TYPE_{name}_{value}`         | `TYPE_ENTITY_ZOMBIE`                  |
| 临时下拉选项      | `FIELD_OPTION_{name}_{value}` | `FIELD_OPTION_EVENT_MOVE_ROTATE_MOVE` |
| 方块数据参数      | `BLOCK_DATA_PARAM_{key}`      | `BLOCK_DATA_PARAM_FACING`             |
| 方块数据值       | `BLOCK_DATA_VALUE_{value}`    | `BLOCK_DATA_VALUE_NORTH`              |
| Event Value | `EVENT_VALUE_{name}`          | `EVENT_VALUE_BLOCK`                   |
| 事件描述        | `EVENT_{KEY}_DESC`            | `EVENT_CLICK_DESC`                    |

key 中的空格和连字符替换为下划线，全部大写。

### 代码生成风格

- 表达式使用 `of` 风格：`ai of {entity}`（不用 `{entity}'s ai`）
- 多值列表使用 Skript 语法：`a, b and c`
- 代码片段拼接使用 `generator.codeJoin()`，自动跳过空值

### Block Key 命名

| 类型  | 格式                  | 示例                     |
| --- | ------------------- | ---------------------- |
| 事件  | `event_{name}`      | `event_click`          |
| 条件  | `condition_{name}`  | `condition_wrapper`    |
| 效果  | `effect_{name}`     | `effect_delay`         |
| 表达式 | `expression_{name}` | `expression_ai`        |
| 类型  | `type_{name}`       | `type_entity`          |
| 片段  | `section_{name}`    | `section_conditionals` |
| 结构  | `structure_{name}`  | `structure_event`      |

***

## 主题系统（`blockly/themes/skripthub.ts`）

| 语法类型       | 颜色        | <br /> |
| ---------- | --------- | ------ |
| event      | `#A763FF` | 紫色     |
| condition  | `#FF3D3D` | 红色     |
| effect     | `#0178FF` | 蓝色     |
| expression | `#0DE505` | 绿色     |
| type       | `#F39C12` | 橙色     |
| function   | `#B4B4B4` | 灰色     |
| section    | `#1ABC9C` | 青色     |
| structure  | `#E056FD` | 品红     |

CSS 样式由 `src/assets/blockly.css` 控制。

***

## 配置与注入（`blockly/config.ts`）

### 全局注册

| 注册项                                       | 说明                |
| ----------------------------------------- | ----------------- |
| `Blockly.dialog.setAlert/Confirm/Prompt`  | 对接 Vue 对话框        |
| `ContextMenuItems.registerCommentOptions` | 注释右键菜单            |
| `ShortcutRegistry: 'SaveToBrowser'`       | Ctrl+S / Cmd+S 保存 |
| `ConnectionChecker`                       | 自定义连接检查器          |

### 块禁用逻辑

`disableOrphans`：非事件块如果在事件块的 `block` statement input 外面，会被禁用（事件块本身除外）。

***

## Vite 插件

### syntax-marker-plugin（`syntax-marker-plugin.ts`）

自动生成各分类目录的 `index.ts`。

- `configResolved`：递归扫描 `src/blockly/blocks/` 下所有目录
- 对每个 `.ts` 文件解析 AST，检查 `'skript syntax'` 标记和 `register`/`registerAll` 导出
- 生成 `index.ts`（导入 + 调用 + 聚合到 `BlockInfos`）
- `handleHotUpdate`：文件变更时重新生成对应目录的 `index.ts`
- `transform`：生产构建时移除 `'skript syntax'` 标记

### syntaxlist-plugin（`syntaxlist-plugin.ts`）

压缩 SkriptHub 语法列表 JSON：移除不必要字段、压缩 key 名、去重 addon。

### blockly-prune-plugin（`blockly-prune-plugin.ts`）

移除 Blockly 默认英文语言包加载（项目使用自定义 i18n）。

***

## EventValues 系统（`blockly/blocks/events/EventValues.ts`）

`SupportedEventValues` 定义所有合法的 event-value 及其输出类型：

```typescript
export const SupportedEventValues = {
  'event-block': 'block',
  'event-player': 'player',
  'event-entity': 'entity',
  'event-location': 'location',
  // ... 80+ 个
}
```

每个 event-value 自动注册右键菜单选项，复用 `expression_event_value` 块类型，通过 `extra_.eventValue` 区分。`SkriptConnectionChecker` 检查当前事件是否支持该 event-value。

***

## 开发命令

```bash
npm run dev          # 开发服务器
npm run build        # 生产构建（含类型检查）
npm run build-only   # 仅构建（跳过类型检查）
npm run type-check   # TypeScript 类型检查
npm run lint         # ESLint 检查并修复
npm run format       # Prettier 格式化
npm run preview      # 预览生产构建
```

***

## 相关链接

- [Skript 官方文档](https://docs.skriptlang.org/)
- [SkriptHub](https://skripthub.net/)
- [Blockly 官方文档](https://developers.google.com/blockly)
- [Vue 3 文档](https://vuejs.org/)
- [Vite 文档](https://vitejs.dev/)

