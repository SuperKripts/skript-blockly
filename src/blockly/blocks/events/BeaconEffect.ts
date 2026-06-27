'skript syntax'

import * as Blockly from 'blockly/core'
import { type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { appendEventPriorityInput, generateCodeForEventPriority } from './EventPriority'
import { pte } from '@/locales/i18n'
import { createFieldDropdown, createTempFieldDropdown } from '../types/Types'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'
import { createSkriptEventDefinition, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_beacon_effect'
const syntax: EventSyntax = {
  title: 'Beacon Effect',
  eventValues: [],
  cancellable: true,
  docId: 0,
}

const PotionEffectTypes = ['speed', 'haste', 'resistance', 'jump_boost', 'strength', 'regeneration']

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptEventDefinition(syntax)
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      const input = this.appendDummyInput()
      pte('EVENT_BEACON_EFFECT_DESC', {
        0: () => input.appendField(createTempFieldDropdown('beacon_effect', ['default', 'primary', 'secondary']), 'primary'),
        1: () => input.appendField(createFieldDropdown({ name: 'potion_effect_type', options: PotionEffectTypes }, true), 'effect'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
      appendEventPriorityInput(this)
    },
    updateShape_() {},
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    const primary = block.getFieldValue('primary')
    const effect = block.getFieldValue('effect')
    const statementMembers = generate.statementToCode(block, 'block')
    const code = SkriptCodeGenerator.codeJoin('on', primary === 'default' ? '' : primary, 'beacon effect', ['of', effect], generateCodeForEventPriority(block))
    return `${code}: \n${statementMembers}`
  }
  return { kind: 'block', type: blockKey }
}
