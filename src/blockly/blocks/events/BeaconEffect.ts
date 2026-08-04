'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createFieldDropdown, createTempFieldDropdown } from '../types/Types'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_beacon_effect'
const syntax: EventSyntax = {
  title: 'Beacon Effect',
  eventValues: [],
  cancellable: true,
  docId: 13318,
}

const PotionEffectTypes = ['speed', 'haste', 'resistance', 'jump_boost', 'strength', 'regeneration']

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_BEACON_EFFECT_DESC', {
        0: () => input.appendField(createTempFieldDropdown('beacon_effect', ['default', 'primary', 'secondary']), 'primary'),
        1: () => input.appendField(createFieldDropdown({ name: 'potion_effect_type', type: 'potioneffecttype', options: PotionEffectTypes }, true), 'effect'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const primary = block.getFieldValue('primary')
      const effect = block.getFieldValue('effect')
      const statementMembers = generate.statementToCode(block, 'block')
      const code = generate.codeJoin('on', primary === 'default' ? '' : primary, 'beacon effect', ['of', effect])
      return `${code}: \n${statementMembers}`
    },
  })
}
