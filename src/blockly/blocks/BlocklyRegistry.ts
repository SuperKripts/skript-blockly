import '@/blockly/blocks/events'
import '@/blockly/blocks/variables'
import '@/blockly/blocks/types/World'

import * as Blockly from 'blockly/core'
import { simpleEvents } from './events/SimpleEvents'

console.log(Blockly.Blocks)

import syntaxlist from '@/blockly/blocks/syntaxlist.json'
import { createEventValueContextMenu } from './events/EventValues'
import { createCancellableContextMenu } from './events/Cancellable'
import I18n from '../langs/i18n'
import { createEventPriorityFieldDropdown } from './events/EventPriority'

const eventSyntaxs: EventSyntax[] = []

type SyntaxList = {
  keyMap: { title: string; syntax_pattern: string; description: string; event_values: string; event_cancellable: string; [key: string]: string }
  addonMap: Record<string, { name: string; link_to_addon: string; usage_score: number }>
  syntaxlist: Record<string, unknown>[]
}

class EventSyntax {
  private title: string
  private description: string
  private eventValues: string[]
  private cancellable: boolean

  constructor(title: string, description: string, eventValues: string[], cancellable: boolean) {
    this.title = title
    this.description = description
    this.eventValues = eventValues
    this.cancellable = cancellable
  }

  getBlocklyId() {
    return this.title.replace(/ /g, '_').toLowerCase()
  }

  registerBlockly() {
    const { title, description, eventValues, cancellable } = this
    Blockly.Blocks[this.getBlocklyId()] = {
      init: function (this: Blockly.Block) {
        this.appendDummyInput().appendField(description)
        this.appendDummyInput()
          .appendField(I18n.getLang('SKRIPT_EVENT_PRIORITY'))
          .appendField(createEventPriorityFieldDropdown(), 'event-priority')
          .setAlign(Blockly.inputs.Align.RIGHT)
        this.appendStatementInput('block')
        this.setStyle('event')
        this.setTooltip(title)
        // this.setHelpUrl(helpUrl)
      },
      customContextMenu: function (this: Blockly.Block, items: { text: string; enabled: boolean; callback: () => void }[]) {
        items.push(...createEventValueContextMenu(eventValues))
        if (cancellable) items.push(...createCancellableContextMenu())
      },
    }
  }
}

const data = syntaxlist as SyntaxList
console.log(data.keyMap)

console.log(data.syntaxlist[0])
console.log(data.addonMap)

const info: { x: string[]; y: string[]; z: string[] } = { x: [], y: [], z: [] }
for (const a of data.syntaxlist) {
  const syntaxType = a[data.keyMap['syntax_type']!] as string
  if (syntaxType === 'event') {
    const title = a[data.keyMap.title] as string
    const syntaxPattern = a[data.keyMap.syntax_pattern] as string
    const description = a[data.keyMap.description] as string
    const eventValue = a[data.keyMap.event_values] as string
    const cancellable = a[data.keyMap.event_cancellable] as boolean
    // 语法存在 % | 或者 多条语法的 情况下 说明这个语法可能较为复杂 不归为简单点事件

    if (syntaxPattern.includes('%')) {
      info.x.push(syntaxPattern)
    } else if (syntaxPattern.includes('|')) {
      info.y.push(syntaxPattern)
    } else if (syntaxPattern.includes('\n')) {
      info.z.push(syntaxPattern)
    } else {
      const eventSyntax = new EventSyntax(title, description, eventValue?.split(', ') ?? [], cancellable)
      eventSyntax.registerBlockly()
      eventSyntaxs.push(eventSyntax)
    }
  }
}
console.log(info)

export const eventBlockInfos: Blockly.utils.toolbox.BlockInfo[] = [
  {
    kind: 'block',
    type: 'skript_event_at_time',
  },
  ...simpleEvents.map((e) => {
    return { kind: 'block', type: e }
  }),
  ...eventSyntaxs.map((e) => {
    return { kind: 'block', type: e.getBlocklyId() }
  }),
]
