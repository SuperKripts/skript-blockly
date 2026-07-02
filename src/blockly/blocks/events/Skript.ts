'skript syntax'

import * as Blockly from 'blockly/core'
import { type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { appendEventPriorityInput, generateCodeForEventPriority } from './EventPriority'
import { pte } from '@/locales/i18n'
import { createTempFieldDropdown } from '../types/Types'
import { createSkriptEventDefinition, type EventSyntax } from './SkriptEventBlock'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'

const blockKey = 'event_server_startstop'
const syntax: EventSyntax = {
  title: 'Server Start/Stop',
  docId: 995,
  eventValues: ['event-command sender'],
  cancellable: false,
}

const serverModes = ['start', 'stop']

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptEventDefinition(syntax)
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      const input = this.appendDummyInput()
      pte('EVENT_SERVER_STARTSTOP_DESC', {
        0: () => input.appendField(createTempFieldDropdown('event_server_startstop', serverModes), 'mode'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
      appendEventPriorityInput(this)
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    const statementMembers = generate.statementToCode(block, 'block')
    const mode = block.getFieldValue('mode')
    const code = SkriptCodeGenerator.codeJoin('on skript', mode, generateCodeForEventPriority(block))
    return `${code}: \n${statementMembers}`
  }
  return { kind: 'block', type: blockKey }
}
