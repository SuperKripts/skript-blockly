'skript syntax'

import * as Blockly from 'blockly/core'
import { type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { appendEventPriorityInput, generateCodeForEventPriority } from './EventPriority'
import { pte } from '@/locales/i18n'
import { createFieldDropdown, ResourcePackStates } from '../types/Types'
import { createSkriptEventDefinition, type EventSyntax } from './SkriptEventBlock'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'

const blockKey = 'event_resource_pack_response'
const syntax: EventSyntax = {
  title: 'Resource Pack Request Response',
  docId: 3725,
  eventValues: ['event-player', 'event-world'],
  cancellable: false,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptEventDefinition(syntax)
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      const input = this.appendDummyInput()
      pte('EVENT_RESOURCE_PACK_REQUEST_RESPONSE_DESC', {
        0: () => input.appendField(createFieldDropdown(ResourcePackStates, true), 'state'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
      appendEventPriorityInput(this)
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    const statementMembers = generate.statementToCode(block, 'block')
    const state = block.getFieldValue('state')
    const code = SkriptCodeGenerator.codeJoin('on resource pack', state === '' ? 'request response' : state, generateCodeForEventPriority(block))
    return `${code}: \n${statementMembers}`
  }
  return { kind: 'block', type: blockKey }
}
