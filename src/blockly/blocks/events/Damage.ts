'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createFieldDropdown } from '../types/Types'
import { Entities } from '../types/Entities'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_damage'
const syntax: EventSyntax = {
  title: 'Damage',
  eventValues: ['event-damage cause', 'event-damage source', 'event-projectile'],
  cancellable: true,
  docId: 1004,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_DAMAGE_DESC', {
        0: () => input.appendField(createFieldDropdown(Entities, true), 'victim'),
        1: () => input.appendField(createFieldDropdown(Entities, true), 'attacker'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const victim = block.getFieldValue('victim')
      const attacker = block.getFieldValue('attacker')
      const statementMembers = generate.statementToCode(block, 'block')
      const code = generate.codeJoin('on damage', ['of', victim], ['by', attacker])
      return `${code}: \n${statementMembers}`
    },
  })
}
