'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptEventDefinition, type EventSyntax } from './SkriptEventBlock'
import type { SkriptBlock, SkriptBlockDefinition } from '../SkriptBlock'
import { createFieldDropdown, createTempFieldDropdown, createFieldSearchDropdown } from '../types/Types'
import { EntitiesItemBlock } from '../types/Other'
import { appendEventPriorityInput, generateCodeForEventPriority } from './EventPriority'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'
import { pte } from '@/locales/i18n'
import { ItemTypes } from '../types/Materials'

const blockKey = 'event_click'
const syntax: EventSyntax = {
  title: 'Click',
  eventValues: [],
  cancellable: false,
  docId: 0,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptEventDefinition(syntax)
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      const input = this.appendDummyInput()
      pte('EVENT_CLICK_DESC', {
        0: () => input.appendField(createTempFieldDropdown('click_type', ['', 'left', 'right']), 'click_type'),
        1: () => input.appendField(createFieldSearchDropdown(EntitiesItemBlock, true), 'click_target'),
        2: () => input.appendField(createFieldDropdown(ItemTypes, true), 'used_item'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
      appendEventPriorityInput(this)
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    const clickType = block.getFieldValue('click_type')
    const clickTarget = block.getFieldValue('click_target')
    const usedItem = block.getFieldValue('used_item')
    const statementMembers = generate.statementToCode(block, 'block')
    const code = SkriptCodeGenerator.codeJoin('on', clickType, 'click', ['on', clickTarget], ['with', usedItem], generateCodeForEventPriority(block))
    return `${code}: \n${statementMembers}`
  }
  return { kind: 'block', type: blockKey }
}
