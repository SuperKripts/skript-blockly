'skript syntax'

import * as Blockly from 'blockly/core'
import CodeGenerator, { Order, SkriptCodeGenerator } from '@/blockly/generators/skript'
import { createSkriptDefinition, type SkriptBlock } from '../SkriptBlock'
import { createTempFieldDropdown } from '../types/Types'

const blockKey = 'condition_wrapper'

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({ title: 'Condition', syntaxType: 'effect', docUrl: 'https://skriptlang.org/docs/conditions.html' })
  const mixin: Partial<SkriptBlock> = {
    initShape_() {
      this.appendValueInput('condition').appendField('123').setCheck('condition')
    },
    initStyle_() {
      this.setStyle('condition')
      this.setPreviousStatement(true)
      this.setNextStatement(true)
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    const condition = generate.valueToCode(block, 'condition', Order.ATOMIC)
    return condition
  }

  return { kind: 'block', type: blockKey }
}

const HAS_MODE = ['has', "don't have"]

export function createConditionDropdown() {
  return createTempFieldDropdown('condition_has_mode', HAS_MODE)
}
