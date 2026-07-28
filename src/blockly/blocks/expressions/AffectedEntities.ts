'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptDefinition, getSkriptHubDocUrl, registerContentMenuGetOption, type SkriptBlockDefinition } from '../SkriptBlock'
import { t } from '@/locales/i18n'
import { generator, Order } from '@/blockly/generators/skript'

const blockKey = 'exprassion_affected_entities'
const supportedEvents = ['event_aoe_cloud_effect']

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({ syntaxType: 'expression', title: 'Affected Entities', docUrl: getSkriptHubDocUrl(3734) })
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_() {
      this.mixin({ supportedEvents_: supportedEvents })
      this.setInputsInline(true)
      this.appendDummyInput().appendField(t('EXPRASSION_AFFECTED_ENTITIES_DESC'))
    },
    initStyle_() {
      this.setOutput(true, 'livingentity')
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  registerContentMenuGetOption(blockKey, 1000, blockKey, supportedEvents, 'EXPRASSION_AFFECTED_ENTITIES_DESC')

  generator.forBlock[blockKey] = function () {
    return ['affected entities', Order.ATOMIC]
  }

  return { kind: 'block', type: blockKey }
}
