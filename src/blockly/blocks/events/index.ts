import * as Blockly from 'blockly/core'
import { SyntaxRegistry } from '@/skript/SyntaxRegistry'
import '@/blockly/blocks/events/EventValues'
import '@/blockly/blocks/events/Cancellable'
import { registerSimpleEvent, SimpleEvents } from '@/blockly/blocks/events/SimpleEvents'

export const EventToolbox: Blockly.utils.toolbox.BlockInfo[] = []

export const _: { x: { key: string; syntax: string }[]; y: { key: string; syntax: string }[]; z: { key: string; syntax: string }[] } = { x: [], y: [], z: [] }

SyntaxRegistry.event.forEach((syntax, key) => {
  if (SimpleEvents.includes(key)) {
    EventToolbox.push(registerSimpleEvent(key, syntax))
    return
  }

  const e = syntax.syntaxPattern.substring(4)
  if (e.includes('\n')) {
    _.x.push({ key, syntax: syntax.syntaxPattern })
  } else if (e.includes('%')) {
    _.y.push({ key, syntax: syntax.syntaxPattern })
  } else if (e.includes('|')) {
    _.z.push({ key, syntax: syntax.syntaxPattern })
  }
})

console.log(SimpleEvents)
console.log(_)
console.log(_.z.map((z) => z.key))
