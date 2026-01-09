import type { EventSyntax } from '@/skript/SyntaxRegistry'
import { createSkriptDefinition, type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { appendEventPriorityInput, generateCodeForEventPriority } from './EventPriority'
import type { Block, CodeGenerator } from 'blockly/core'

export type SkriptEventBlock = SkriptBlock & {
  eventValues_: string[]
  eventCancellable_: boolean | undefined
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
  }

  return Object.assign(definition, mixin)
}

export function createEventCodeGenerator() {
  return (block: Block, generate: CodeGenerator) => {
    const eventBlock = block as SkriptEventBlock
    const code = eventBlock.generateToCode_()
    const statementMembers = generate.statementToCode(block, 'block')
    const proirity = generateCodeForEventPriority(block)
    return `${code}${proirity}: \n${statementMembers}`
  }
}
