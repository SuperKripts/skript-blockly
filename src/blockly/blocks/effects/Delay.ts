'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptDefinition, getSkriptHubDocUrl, type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'
import { pte } from '@/locales/i18n'

const blockKey = 'effect_delay'
export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({
    title: 'Delay',
    syntaxType: 'effect',
    docUrl: getSkriptHubDocUrl(0),
  })
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      this.setInputsInline(true)
      pte('EFFECT_DELAY_DESC', {
        0: () => this.appendValueInput('timespan'),
        default: ({ msg, index }) => this.appendDummyInput().appendField(msg, 'part-' + index),
      })
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    return `wait ${generate.valueToCode(block, 'timespan', 0)}`
  }
  return { kind: 'block', blockxml: '<block type="effect_delay"><value name="timespan"><shadow type="type_timespan"></shadow></value></block>' }
}
