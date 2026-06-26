'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptDefinition, getSkriptHubDocUrl, type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { appendEventPriorityInput } from './EventPriority'
import { pte } from '@/locales/i18n'
import { createFieldDropdown, Entities } from '../types/Types'

const key = 'attempt_attack'
const title = 'Attempt Attack'
const blockKey = 'event_attempt_attack'
const docId = 0

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({ key, title, syntaxType: 'event', docUrl: getSkriptHubDocUrl(docId) })
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      const input = this.appendDummyInput()
      pte('EVENT_ATTEMPT_ATTACK_DESC', {
        0: () => input.appendField(createFieldDropdown(Entities, true), 'entity'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
      appendEventPriorityInput(this)
    },
    updateShape_() {},
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  return { kind: 'block', type: blockKey }
}
