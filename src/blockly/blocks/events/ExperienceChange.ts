'skript syntax'

import * as Blockly from 'blockly/core'
import { type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { appendEventPriorityInput, generateCodeForEventPriority } from './EventPriority'
import { pte } from '@/locales/i18n'
import { createTempFieldDropdown } from '../types/Types'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'
import { createSkriptEventDefinition, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_experience_change'
const syntax: EventSyntax = {
  title: 'Experience Change',
  eventValues: ['event-experience point', 'event-player', 'event-world'],
  cancellable: false,
  docId: 9454,
}

const changeModes = ['change', 'increase', 'decrease']

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptEventDefinition(syntax)
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      const input = this.appendDummyInput()
      pte('EVENT_EXPERIENCE_CHANGE_DESC', {
        0: () => input.appendField(createTempFieldDropdown('event_experience_change', changeModes), 'mode'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
      appendEventPriorityInput(this)
    },
    updateShape_() {},
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    const mode = block.getFieldValue('mode')
    const statementMembers = generate.statementToCode(block, 'block')
    const code = SkriptCodeGenerator.codeJoin('on experience', mode, generateCodeForEventPriority(block))
    return `${code}: \n${statementMembers}`
  }
  return { kind: 'block', type: blockKey }
}
