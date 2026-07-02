'skript syntax'

import * as Blockly from 'blockly/core'
import { type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { appendEventPriorityInput, generateCodeForEventPriority } from './EventPriority'
import { pte } from '@/locales/i18n'
import { FieldTime } from '@/blockly/inputs/FieldTime'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'
import { createSkriptEventDefinition, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_real_time'
const syntax: EventSyntax = {
  title: 'System Time',
  docId: 13321,
  eventValues: [],
  cancellable: false,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptEventDefinition(syntax)
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      const input = this.appendDummyInput()
      pte('EVENT_REAL_TIME_DESC', {
        0: () => input.appendField<string>(new FieldTime(), 'time'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
      appendEventPriorityInput(this)
    },
    updateShape_() {},
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    const time = block.getFieldValue('time')
    const statementMembers = generate.statementToCode(block, 'block')
    const code = SkriptCodeGenerator.codeJoin('at', time, 'in real time', generateCodeForEventPriority(block))
    return `${code}: \n${statementMembers}`
  }
  return { kind: 'block', type: blockKey }
}
