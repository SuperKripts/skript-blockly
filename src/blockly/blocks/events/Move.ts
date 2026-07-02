'skript syntax'

import * as Blockly from 'blockly/core'
import { type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { appendEventPriorityInput, generateCodeForEventPriority } from './EventPriority'
import { pte } from '@/locales/i18n'
import { createFieldDropdown, createTempFieldDropdown } from '../types/Types'
import { createSkriptEventDefinition, type EventSyntax } from './SkriptEventBlock'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'
import { Entities } from '../types/Entities'

const blockKey = 'event_move_rotate'
const syntax: EventSyntax = {
  title: 'Move / Rotate',
  docId: 10124,
  eventValues: [
    'event-block',
    'event-chunk',
    'event-command sender',
    'event-entity',
    'event-entity type',
    'event-location',
    'event-player',
    'event-teleport cause',
    'event-world',
    'future event-location',
    'past event-chunk',
    'past event-location',
  ],
  cancellable: true,
}

const moveModes = ['move', 'rotate', 'move_or_rotate']

const moveModeCodeMap: Record<string, string> = {
  move: 'move',
  rotate: 'turn around',
  move_or_rotate: 'move or turn around',
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptEventDefinition(syntax)
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      const input = this.appendDummyInput()
      pte('EVENT_MOVE_ROTATE_DESC', {
        0: () => input.appendField(createFieldDropdown(Entities, false), 'entity'),
        1: () => input.appendField(createTempFieldDropdown('event_move_rotate', moveModes), 'mode'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
      appendEventPriorityInput(this)
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    const statementMembers = generate.statementToCode(block, 'block')
    const mode = block.getFieldValue('mode')
    const code = SkriptCodeGenerator.codeJoin('on', block.getFieldValue('entity'), moveModeCodeMap[mode], generateCodeForEventPriority(block))
    return `${code}: \n${statementMembers}`
  }
  return { kind: 'block', type: blockKey }
}
