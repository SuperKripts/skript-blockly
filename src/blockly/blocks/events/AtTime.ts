import * as Blockly from 'blockly/core'
import SkriptCodeGenerator, { arrayJoin } from '@/blockly/generators/skript'
import { createEventValueContextMenu } from './EventValues'
import WorldMutator from '../types/World'
import { FieldTime } from '@/blockly/inputs/FieldTime'
import { createEventPriorityFieldDropdown } from './EventPriority'
import { pt, t } from '@/locales/i18n'

const key = 'skript_event_at_time'
const desc = 'SKRIPT_EVENT_AT_TIME_DESC'
const name = 'at time'
const helpUrl = 'https://docs.skriptlang.org/events.html#at_time'
const eventValue = ['event-world']

type AtTimeBlockExtraState = {
  worlds: { id: string; value: string }[]
}

type AtTimeBlock = Blockly.BlockSvg & {
  _ex_world: { id: string; value: string }[]
  initState_: () => void
  updateShape_: () => void
}

Blockly.Blocks[key] = {
  init: function (this: AtTimeBlock) {
    const input = this.appendDummyInput()
    const parts = pt(desc)
    parts.forEach((v, i) => {
      if (typeof v === 'string') {
        input.appendField(v, 'part-' + i)
      } else {
        input.appendField<string>(new FieldTime(), 'time')
      }
    })
    this.appendDummyInput().appendField(t('SKRIPT_EVENT_PRIORITY')).appendField(createEventPriorityFieldDropdown(), 'event-priority').setAlign(Blockly.inputs.Align.RIGHT)
    this.appendStatementInput('block')
    this.setStyle('event')
    this.setTooltip(name)
    this.setHelpUrl(helpUrl)
    this.initState_()
    this.updateShape_()
    this.setMutator(WorldMutator.createMutator(this))
  },
  initState_: function (this: AtTimeBlock) {
    this._ex_world = []
  },
  updateShape_: function (this: AtTimeBlock) {
    const parts = pt(desc, [this._ex_world.map((e) => e.value).join(', ')], this._ex_world.length + 1)
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      if (typeof part === 'string') {
        this.setFieldValue(part, 'part-' + i)
      }
    }
  },
  compose: function (this: AtTimeBlock, topBlock: Blockly.Block) {
    this._ex_world = WorldMutator.extractValues(topBlock)
    this.updateShape_()
  },
  decompose: function (this: AtTimeBlock, workspace: Blockly.Workspace) {
    return WorldMutator.createTopBlock(workspace, this._ex_world)
  },
  saveExtraState: function (this: AtTimeBlock): AtTimeBlockExtraState {
    return { worlds: this._ex_world }
  },
  loadExtraState: function (this: AtTimeBlock, state: AtTimeBlockExtraState) {
    this._ex_world = state.worlds ?? []
    this.updateShape_()
  },
  customContextMenu: function (this: AtTimeBlock, items: { text: string; enabled: boolean; callback: () => void }[]) {
    items.push(...createEventValueContextMenu(eventValue))
  },
}

SkriptCodeGenerator.forBlock[key] = function (block, generator) {
  const atTimeBlock = block as AtTimeBlock
  const time = ' ' + block.getFieldValue('time')!
  const inWorld =
    atTimeBlock._ex_world.length == 0
      ? ''
      : ' in ' +
        arrayJoin(
          atTimeBlock._ex_world.map((e) => e.value),
          true,
        )
  const statementMembers = generator.statementToCode(block, 'block')
  const eventPriority = block.getFieldValue('event-priority')
  const code = `${name}${time}${inWorld}${eventPriority}:\n${statementMembers}`
  return code
}
