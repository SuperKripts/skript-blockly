import '@/blockly/blocks/events'
import '@/blockly/blocks/variables'
import '@/blockly/blocks/types/World'

import * as Blockly from 'blockly/core'
import { simpleEvents } from './events/SimpleEvents'

console.log(Blockly.Blocks)

export type SyntaxList = {
  keyMap: {
    id: string
    json_id: string
    title: string
    syntax_type: string
    syntax_pattern: string
    description: string
    event_values: string
    event_cancellable: string
    [key: string]: string
  }
  addonMap: Record<string, { name: string; link_to_addon: string; usage_score: number }>
  syntaxlist: Record<string, unknown>[]
}
export const syntaxTypes = ['event', 'condition', 'effect', 'expression', 'type', 'function', 'section', 'structure'] as const
export type SyntaxType = (typeof syntaxTypes)[number]
export type Syntax = {
  id: number
  jsonId: string
  title: string
  syntaxType: SyntaxType
  syntaxPattern: string
}

export type EventSyntax = Syntax & {
  eventValues: string[]
  cancellable: boolean
}

export const syntaxRegistry = {
  event: new Map<string, EventSyntax>(),
  condition: new Map<string, Syntax>(),
  effect: new Map<string, Syntax>(),
  expression: new Map<string, Syntax>(),
  type: new Map<string, Syntax>(),
  function: new Map<string, Syntax>(),
  section: new Map<string, Syntax>(),
  structure: new Map<string, Syntax>(),
}

async function registerSyntax() {
  const syntaxlistData = await import('@/blockly/blocks/syntaxlist.json').then((e) => e.default as SyntaxList)
  for (const syntax of syntaxlistData.syntaxlist) {
    const id = syntax[syntaxlistData.keyMap.id] as number
    const jsonId = syntax[syntaxlistData.keyMap.json_id] as string
    const title = syntax[syntaxlistData.keyMap.title] as string
    const syntaxType = syntax[syntaxlistData.keyMap.syntax_type] as SyntaxType
    const syntaxPattern = syntax[syntaxlistData.keyMap.syntax_pattern] as string
    switch (syntaxType) {
      case 'event': {
        const eventValues = syntax[syntaxlistData.keyMap.event_values] as string
        const cancellable = syntax[syntaxlistData.keyMap.event_cancellable] as boolean
        syntaxRegistry.event.set(jsonId, {
          id,
          jsonId,
          title,
          syntaxType,
          syntaxPattern,
          eventValues: eventValues ? eventValues.split(',').map((e) => e.trim()) : [],
          cancellable,
        })
        break
      }
      case 'condition':
      case 'effect':
      case 'expression':
      case 'type':
      case 'function':
      case 'section':
      case 'structure':
        syntaxRegistry[syntaxType].set(jsonId, { id, jsonId, title, syntaxType, syntaxPattern })
        break
    }
  }
  console.log(syntaxlistData.keyMap)
  console.log(syntaxlistData.syntaxlist)
  console.log(syntaxlistData.addonMap)
}

await registerSyntax()

console.log(syntaxRegistry)

export const eventBlockInfos: Blockly.utils.toolbox.BlockInfo[] = [
  {
    kind: 'block',
    type: 'skript_event_at_time',
  },
  ...simpleEvents.map((e) => {
    return { kind: 'block', type: e }
  }),
]
