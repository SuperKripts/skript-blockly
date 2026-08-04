'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptDefinition, type SkriptBlock } from '../SkriptBlock'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'
import { t } from '@/locales/i18n'

const blockKey = 'structure_event'

export const priority = ['default', 'lowest', 'low', 'normal', 'high', 'highest', 'monitor']
export const behavior = ['any', 'cancelled', 'uncancelled'] as const
export function createEventPriorityFieldDropdown() {
  return new Blockly.FieldDropdown(priority.map((priority) => [t(`EVENT_PRIORITY_${priority.toUpperCase()}`), priority]))
}
export function createEventBehaviorFieldDropdown() {
  return new Blockly.FieldDropdown(behavior.map((behavior) => [t(`EVENT_BEHAVIOR_${behavior.toUpperCase()}`), behavior]))
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({ title: 'Event', syntaxType: 'structure', docUrl: 'https://skriptlang.org/docs/structures/event' })
  const mixin: Partial<SkriptBlock> = {
    initShape_() {
      this.appendDummyInput().appendField(t('EVENT_PRIORITY')).appendField(createEventPriorityFieldDropdown(), 'event-priority').setAlign(Blockly.inputs.Align.RIGHT)
      this.appendDummyInput().appendField(t('EVENT_BEHAVIOR')).appendField(createEventBehaviorFieldDropdown(), 'event-behavior').setAlign(Blockly.inputs.Align.RIGHT)
    },
    initStyle_() {
      this.appendStatementInput('event').setCheck('event')
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    const code = generate.statementToCode(block, 'event')

    const lines = code.split('\n').map((line) => line.substring(generate.INDENT.length))

    if (lines.length === 0 || lines[0] === '') {
      return ''
    }

    const firstLine = lines[0]

    const behavior = block.getFieldValue('event-behavior')
    const priority = block.getFieldValue('event-priority')
    const behaviorCode = behavior === 'any' ? '' : behavior + ' '
    const priorityCode = priority === 'default' ? '' : ' with priority ' + priority

    const colonPos = firstLine.lastIndexOf(':')

    let newFirstLine
    if (firstLine.startsWith('on ')) {
      newFirstLine = `on ${behaviorCode}${firstLine.substring(3, colonPos)}${priorityCode}: `
    } else if (behavior === 'any') {
      newFirstLine = `${firstLine.substring(0, colonPos)}${priorityCode}: `
    } else {
      newFirstLine = `on ${behaviorCode}${firstLine.substring(0, colonPos)}${priorityCode}: `
    }
    lines[0] = newFirstLine
    return lines.join('\n')
  }

  return { kind: 'block', type: blockKey }
}
