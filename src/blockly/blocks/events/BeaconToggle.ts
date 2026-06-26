'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptDefinition, getSkriptHubDocUrl, type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { appendEventPriorityInput } from './EventPriority'
import { pte } from '@/locales/i18n'
import { createTempFieldDropdown } from '../types/Types'

const key = 'beacon_toggle'
const title = 'Beacon Toggle'
const blockKey = 'event_beacon_toggle'
const docId = 0

const toggleModes = ['toggle', 'activate', 'deactivate']

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({ key, title, syntaxType: 'event', docUrl: getSkriptHubDocUrl(docId) })
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      const input = this.appendDummyInput()
      pte('EVENT_BEACON_TOGGLE_DESC', {
        0: () => input.appendField(createTempFieldDropdown('event_beacon_toggle', toggleModes), 'mode'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
      appendEventPriorityInput(this)
    },
    updateShape_() {},
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  return { kind: 'block', type: blockKey }
}
