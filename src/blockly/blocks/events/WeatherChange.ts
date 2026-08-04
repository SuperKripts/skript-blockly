'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createFieldDropdown } from '../types/Types'
import { Weather } from '../types/Weather'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_weather_change'
const syntax: EventSyntax = {
  title: 'Weather Change',
  docId: 1096,
  eventValues: ['event-world'],
  cancellable: true,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_WEATHER_CHANGE_DESC', {
        0: () => input.appendField(createFieldDropdown(Weather, true), 'weather'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const statementMembers = generate.statementToCode(block, 'block')
      const weather = block.getFieldValue('weather')
      const code = generate.codeJoin('on weather change', ['to', weather])
      return `${code}: \n${statementMembers}`
    },
  })
}
