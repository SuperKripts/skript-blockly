'skript syntax'

import { FieldTimespan } from '@/blockly/inputs/FieldTimespan'
import { createSkriptDefinition, getSkriptHubDocUrl, type SkriptBlockDefinition } from '../SkriptBlock'
import type { SkriptType } from './Types'
import * as Blockly from 'blockly/core'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'

export const Timespan: SkriptType = {
  name: 'timespan',
  options: ['millisecond', 'tick', 'second', 'minute', 'hour', 'day', 'week', 'month', 'year', 'real', 'minecraft', 'forever'],
}

const blockKey = 'type_timespan'

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({
    title: 'Timespan',
    syntaxType: 'type',
    docUrl: getSkriptHubDocUrl(2167),
  })
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_() {
      this.appendDummyInput().appendField(new FieldTimespan(), 'timespan')
    },
    initStyle_() {
      this.setOutput(true, 'timespan')
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, _generate: SkriptCodeGenerator) => {
    return [block.getFieldValue('timespan'), 0]
  }
  return { kind: 'block', type: blockKey }
}
