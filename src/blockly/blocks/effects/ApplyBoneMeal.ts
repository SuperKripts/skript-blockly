'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptDefinition, getSkriptHubDocUrl, type SkriptBlock, type SkriptBlockDefinition, type Syntax } from '../SkriptBlock'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'
import { pte } from '@/locales/i18n'

const blockKey = 'effect_apply_bone_meal'
const syntax: Syntax = {
  title: 'Apply Bone Meal',
  syntaxType: 'effect',
  docUrl: getSkriptHubDocUrl(10141),
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition(syntax)
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      this.setInputsInline(true)
      pte('EFFECT_APPLY_BONE_MEAL_DESC', {
        0: () => this.appendValueInput('amount'),
        1: () => this.appendValueInput('blocks'),
        default: ({ msg, index }) => this.appendDummyInput().appendField(msg, 'part-' + index),
      })
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    const amount = generate.valueToCode(block, 'amount', 0)
    const blocks = generate.valueToCode(block, 'blocks', 0)
    return SkriptCodeGenerator.codeJoin('apply', amount, 'bone meal', ['to', blocks])
  }
  return {
    kind: 'block',
    blockxml: `<block type="effect_apply_bone_meal"><value name="amount"><shadow type="type_number"><field name="number">1</field></shadow></value><value name="blocks"><shadow type="type_block"></shadow></value></block>`,
  }
}
