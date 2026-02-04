import { SyntaxRegistry } from '@/skript/SyntaxRegistry'
import { createSkriptDefinition, type SkriptBlock, type SkriptBlockDefinition } from './SkriptBlock'
import * as Blockly from 'blockly/core'
import CodeGenerator from '../generators/skript'

// SyntaxRegistry 包含skripthub中的 所有语法 详见 @link /src/assets/syntaxlist.json
// 此处获取 at_time 语法
const atTimeSyntax = SyntaxRegistry.event.get('at_time')

// 创建积木定义 - 基础定义
const definition = createSkriptDefinition(atTimeSyntax!)
// 创建积木定义 - 混合定义(SkriptBlockly默认采用mixin模式来扩展积木定义 以便于后续维护)
const mixin: Partial<SkriptBlockDefinition> = {
  // 初始化积木形状(主要是添加输入)
  initShape_(this: SkriptBlock) {
    // 添加积木输入
    this.appendDummyInput().appendField('at time')
  },

  // 初始化积木样式(主要是设置积木颜色和一些基础的东西)
  initStyle_(this: SkriptBlock) {},
}
// 最终积木定义
const finalDefinition = Object.assign(definition, mixin)
// 将积木定义注册至Blockly
Blockly.Blocks[atTimeSyntax!.jsonId] = finalDefinition

// Skript代码生成器 - 定义如何将积木转换为skript代码
CodeGenerator.forBlock[atTimeSyntax!.jsonId] = function (this: Blockly.Block) {
  return 'at time'
}

/// 以上是最基础的注册积木的方式 详细注册可以看 @link /src/blockly/blocks/events/index.ts
// 很多内容可以参考 blockly的官方文档 也有很多内容 https://developers.google.cn/blockly/guides/get-started/what-is-blockly?hl=zh-cn
// ---------------------------------------------------------------------------------------------------------------------

// 其它例子
// @link /src/blockly/blocks/events/AtTime.ts AtTime积木
// @link /src/blockly/blocks/events/EventValues.ts 事件值积木
// @link /src/blockly/inputs/FieldTime.ts 时间输入框
