'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createFieldDropdown } from '../types/Types'
import { GameModes } from '../types/GameModes'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_gamemode_change'
const syntax: EventSyntax = {
  title: 'Gamemode Change',
  eventValues: ['event-player', 'event-world'],
  cancellable: true,
  docId: 1008,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_GAMEMODE_CHANGE_DESC', {
        0: () => input.appendField(createFieldDropdown(GameModes, true), 'gamemode'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const gamemode = block.getFieldValue('gamemode')
      const statementMembers = generate.statementToCode(block, 'block')
      const code = generate.codeJoin('on gamemode change', ['to', gamemode])
      return `${code}: \n${statementMembers}`
    },
  })
}
