import * as Blockly from 'blockly/core'
import { SyntaxRegistry } from '@/skript/SyntaxRegistry'
import '@/blockly/blocks/events/EventValues'
import '@/blockly/blocks/events/Cancellable'
import { SimpleEvents, registerSimpleEvent } from '@/blockly/blocks/events/SimpleEvents'
import { EasyEvents, registerEasyEvent } from '@/blockly/blocks/events/EasyEvents'

export const EventToolbox: Blockly.utils.toolbox.BlockInfo[] = []

export const unregisteredSyntax: { key: string; syntax: string }[] = []

SyntaxRegistry.event.forEach((syntax, key) => {
  if (SimpleEvents.includes(key)) {
    EventToolbox.push(registerSimpleEvent(key, syntax))
    return
  }
  if (EasyEvents.includes(key)) {
    EventToolbox.push(registerEasyEvent(key, syntax))
    return
  }

  unregisteredSyntax.push({ key, syntax: syntax.syntaxPattern })
})

console.log('Unregistered Event:', unregisteredSyntax)
