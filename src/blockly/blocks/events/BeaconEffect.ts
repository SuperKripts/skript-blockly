'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptDefinition, getSkriptHubDocUrl, type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { appendEventPriorityInput } from './EventPriority'
import { pte } from '@/locales/i18n'
import { createFieldDropdown, createTempFieldDropdown } from '../types/Types'

const key = 'beacon_effect'
const title = 'Beacon Effect'
const blockKey = 'event_beacon_effect'
const docId = 0

const PotionEffectTypes = ['speed', 'haste', 'resistance', 'jump_boost', 'strength', 'regeneration']

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({ key, title, syntaxType: 'event', docUrl: getSkriptHubDocUrl(docId) })
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      const input = this.appendDummyInput()
      pte('EVENT_BEACON_EFFECT_DESC', {
        0: () => input.appendField(createTempFieldDropdown('beacon_effect', ['default', 'primary', 'secondary']), 'primary'),
        1: () => input.appendField(createFieldDropdown({ name: 'potion_effect_type', options: PotionEffectTypes }, true), 'effect'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
      appendEventPriorityInput(this)
    },
    updateShape_() {},
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  return { kind: 'block', type: blockKey }
}
