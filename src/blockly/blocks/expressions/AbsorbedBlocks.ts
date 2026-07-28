'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptDefinition, getSkriptHubDocUrl, registerContentMenuGetOption, type SkriptBlockDefinition } from '../SkriptBlock'
import { t } from '@/locales/i18n'
import { generator, Order } from '@/blockly/generators/skript'

const blockKey = 'exprassion_absorbed_blocks'
const supportedEvents = ['event_sponge_absorb']

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({ syntaxType: 'expression', title: 'Absorbed Blocks', docUrl: getSkriptHubDocUrl(4183) })
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_() {
      this.mixin({ supportedEvents_: supportedEvents })
      this.setInputsInline(true)
      this.appendDummyInput().appendField(t('EXPRASSION_ABSORBED_BLOCKS_DESC'))
    },
    initStyle_() {
      this.setOutput(true, 'block')
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  registerContentMenuGetOption(blockKey, 1000, blockKey, supportedEvents, 'EXPRASSION_ABSORBED_BLOCKS_DESC')

  generator.forBlock[blockKey] = function () {
    return ['absorbed blocks', Order.ATOMIC]
  }

  return { kind: 'block', type: blockKey }
}
