'skript syntax'

import * as Blockly from 'blockly/core'
import { type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { pte } from '@/locales/i18n'
import { createFieldDropdown } from '../types/Types'
import { Entities } from '../types/Entities'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'
import { createSkriptEventDefinition, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_attempt_attack'
const syntax: EventSyntax = {
  title: 'Attempt Attack',
  eventValues: ['event-player', 'event-world'],
  cancellable: false,
  docId: 14679,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptEventDefinition(syntax)
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      const input = this.appendDummyInput()
      pte('EVENT_ATTEMPT_ATTACK_DESC', {
        0: () => input.appendField(createFieldDropdown(Entities, true), 'entity'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    initStyle_() {
      this.setPreviousStatement(true, 'event')
      this.appendStatementInput('block')
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    const entity = block.getFieldValue('entity')
    const statementMembers = generate.statementToCode(block, 'block')
    const code = SkriptCodeGenerator.codeJoin(entity === '' ? 'on attack attempt' : 'on attempt to attack', entity)
    return `${code}: \n${statementMembers}`
  }
  return { kind: 'block', type: blockKey }
}
