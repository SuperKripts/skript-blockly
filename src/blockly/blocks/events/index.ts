import * as Blockly from 'blockly/core'
import { SyntaxRegistry, type EventSyntax } from '@/skript/SyntaxRegistry'
import '@/blockly/blocks/events/EventValues'
import '@/blockly/blocks/events/Cancellable'
import { createEventPriorityFieldDropdown, generateCodeForEventPriority } from '@/blockly/blocks/events/EventPriority'
import { createSkriptDefinition, type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { t } from '@/locales/i18n'
import { generateCodeForSimpleEvent, SimpleEvents } from '@/blockly/blocks/events/SimpleEvents'
import CodeGenerator from '@/blockly/generators/skript'

export const EventToolbox: Blockly.utils.toolbox.BlockInfo[] = []

export const _: { x: { key: string; syntax: string }[]; y: { key: string; syntax: string }[]; z: { key: string; syntax: string }[] } = { x: [], y: [], z: [] }

function generateEventBlockKey(syntax: EventSyntax) {
  return `event_${syntax.jsonId}`
}

function createSkriptEventDefinition(syntax: EventSyntax) {
  const definition = createSkriptDefinition(syntax)
  const mixin: Partial<SkriptBlockDefinition> & Record<string, unknown> = {
    eventValues_: syntax.eventValues,
    eventCancellable_: syntax.cancellable,
    initStyle_(this: SkriptBlock) {
      this.appendDummyInput().appendField(t('EVENT_PRIORITY')).appendField(createEventPriorityFieldDropdown(), 'event-priority').setAlign(Blockly.inputs.Align.RIGHT)
      this.appendStatementInput('block')
      this.setStyle('event')
    },
  }
  return Object.assign(definition, mixin)
}

SyntaxRegistry.event.forEach((syntax, key) => {
  if (!SimpleEvents.includes(key)) {
    const e = syntax.syntaxPattern.substring(4)
    if (e.includes('\n')) {
      _.x.push({ key, syntax: syntax.syntaxPattern })
    } else if (e.includes('%')) {
      _.y.push({ key, syntax: syntax.syntaxPattern })
    } else if (e.includes('|')) {
      _.z.push({ key, syntax: syntax.syntaxPattern })
    }
    return
  }

  const blockKey = generateEventBlockKey(syntax)
  const definition = createSkriptEventDefinition(syntax)
  Blockly.Blocks[blockKey] = definition
  CodeGenerator.forBlock[blockKey] = function (block, generator) {
    const code = generateCodeForSimpleEvent(key)
    const statementMembers = generator.statementToCode(block, 'block')
    const eventPriority = block.getFieldValue('event-priority')
    const proirity = generateCodeForEventPriority(eventPriority)
    return `${code}${proirity}: \n${statementMembers}`
  }
  EventToolbox.push({
    kind: 'block',
    type: blockKey,
  })
})

console.log(SimpleEvents)
console.log(_)
console.log(_.z.map((z) => z.key))
