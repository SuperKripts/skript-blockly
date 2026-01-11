import type { EventSyntax } from '@/skript/SyntaxRegistry'
import { createSkriptDefinition, type SkriptBlock, type SkriptBlockDefinition } from '@/blockly/blocks/SkriptBlock'
import { appendEventPriorityInput, generateCodeForEventPriority } from '@/blockly/blocks/events/EventPriority'
import type { Block, CodeGenerator } from 'blockly/core'

export type SkriptEventBlock = SkriptBlock & {
  eventValues_: string[]
  eventCancellable_: boolean | undefined
  generateEventCode_: (this: SkriptEventBlock) => string
}

export function generateEventBlockKey(syntax: EventSyntax) {
  return `event_${syntax.jsonId}`
}

export function createEventDefinition(syntax: EventSyntax) {
  const definition = createSkriptDefinition(syntax)
  const mixin: Partial<SkriptBlockDefinition> & Partial<SkriptEventBlock> = {
    eventValues_: syntax.eventValues,
    eventCancellable_: syntax.cancellable,
    initStyle_(this: SkriptBlock) {
      appendEventPriorityInput(this)
      this.appendStatementInput('block')
      this.setStyle('event')
    },
    generateEventCode_() {
      throw new Error('Method not implemented.')
    },
  }

  return Object.assign(definition, mixin)
}

export function createEventCodeGenerator() {
  return (block: Block, generate: CodeGenerator) => {
    const eventBlock = block as SkriptEventBlock
    const code = eventBlock.generateEventCode_()
    const statementMembers = generate.statementToCode(block, 'block')
    const proirity = generateCodeForEventPriority(block)
    return `${code}${proirity}: \n${statementMembers}`
  }
}
