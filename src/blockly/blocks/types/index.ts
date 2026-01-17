import * as Blockly from 'blockly/core'
import { SyntaxRegistry } from '@/skript/SyntaxRegistry'

export const TypeToolbox: Blockly.utils.toolbox.BlockInfo[] = []

export const unregisteredSyntax: { key: string; syntax: string; usage: string }[] = []

SyntaxRegistry.type.forEach((syntax, key) => {
  unregisteredSyntax.push({ key, syntax: syntax.syntaxPattern, usage: syntax.typeUsage })
})

console.log('Unregistered Type:', unregisteredSyntax)
console.log(unregisteredSyntax.filter((s) => s.syntax))
