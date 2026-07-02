'skript syntax'

import * as Blockly from 'blockly/core'
import { type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { appendEventPriorityInput, generateCodeForEventPriority } from './EventPriority'
import { pte } from '@/locales/i18n'
import { createFieldDropdown, createTempFieldDropdown } from '../types/Types'
import { createSkriptEventDefinition, type EventSyntax } from './SkriptEventBlock'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'
import { Entities } from '../types/Entities'

const blockKey = 'event_spectate'
const syntax: EventSyntax = {
  title: 'Spectate',
  docId: 9461,
  eventValues: ['event-player', 'event-world'],
  cancellable: true,
}

const spectateModes = ['start', 'stop', 'swap']

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptEventDefinition(syntax)
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      const input = this.appendDummyInput()
      pte('EVENT_SPECTATE_DESC', {
        0: () => input.appendField(createTempFieldDropdown('event_spectate', spectateModes), 'mode'),
        1: () => input.appendField(createFieldDropdown(Entities, true), 'entity'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
      appendEventPriorityInput(this)
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    const statementMembers = generate.statementToCode(block, 'block')
    const mode = block.getFieldValue('mode')
    const entity = block.getFieldValue('entity')
    const code = SkriptCodeGenerator.codeJoin('on player', mode, 'spectating', ['of', entity], generateCodeForEventPriority(block))
    return `${code}: \n${statementMembers}`
  }
  return { kind: 'block', type: blockKey }
}
