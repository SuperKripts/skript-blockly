import * as Blockly from 'blockly/core'
import { SyntaxRegistry } from '@/skript/SyntaxRegistry'

export const EffectToolbox: Blockly.utils.toolbox.BlockInfo[] = []

export const unregisteredSyntax: { key: string; syntax: string }[] = []

SyntaxRegistry.effect.forEach((syntax, key) => {
  unregisteredSyntax.push({ key, syntax: syntax.syntaxPattern })
})

console.log('Unregistered Effect:', unregisteredSyntax)
console.log(unregisteredSyntax.filter((s) => s.syntax))
