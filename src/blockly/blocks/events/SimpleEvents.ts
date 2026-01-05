import * as Blockly from 'blockly/core'
import SkriptCodeGenerator from '@/blockly/generators/skript'
import { createEventValueContextMenu } from './EventValues'
import { createEventPriorityFieldDropdown } from './EventPriority'
import { createCancellableContextMenu } from './Cancellable'
import { createEquipmentSlotArmorFieldDropdown } from '../types/EquipmentSlot'
import { createPotionEffectTypeFieldDropdown } from '../types/PointEffect'
import { pt, t } from '@/locales/i18n'

export const simpleEvents: string[] = []

function registerSimpleEventBlock(
  key: string,
  name: string,
  desc: string,
  eventValue: string[],
  cancelable: boolean,
  helpUrl: string,
  parameter?: {
    input: () => Blockly.Field
    fieldName?: string
    codePrefix: (text: string) => string
  },
) {
  // 注册事件积木块
  Blockly.Blocks[key] = {
    init: function (this: Blockly.Block) {
      if (parameter) {
        const input = this.appendDummyInput()
        for (const part of pt(desc)) {
          if (typeof part === 'string') {
            input.appendField(part)
          } else {
            input.appendField(parameter.input(), parameter.fieldName ?? 'value')
          }
        }
      } else {
        this.appendDummyInput().appendField(t(desc))
      }
      this.appendDummyInput().appendField(t('SKRIPT_EVENT_PRIORITY')).appendField(createEventPriorityFieldDropdown(), 'event-priority').setAlign(Blockly.inputs.Align.RIGHT)
      this.appendStatementInput('block')
      this.setStyle('event')
      this.setTooltip(name)
      this.setHelpUrl(helpUrl)
    },
    customContextMenu: function (this: Blockly.Block, items: { text: string; enabled: boolean; callback: () => void }[]) {
      items.push(...createEventValueContextMenu(eventValue))
      if (cancelable) items.push(...createCancellableContextMenu())
    },
  }

  // 注册积木块代码生成
  SkriptCodeGenerator.forBlock[key] = function (block, generator) {
    const statementMembers = generator.statementToCode(block, 'block')
    const eventPriority = block.getFieldValue('event-priority')
    let prefix = name
    if (parameter) {
      const text = block.getFieldValue(parameter.fieldName ?? 'value')
      prefix = parameter.codePrefix(text)
    }
    const code = `${prefix}${eventPriority}:\n${statementMembers}`
    return code
  }

  simpleEvents.push(key)
}

const rsb = (
  skriptId: string,
  eventValues: string[],
  cancelable = true,
  options: {
    name?: string
    parameter?: {
      input: () => Blockly.Field
      fieldName?: string
      codePrefix: (text: string) => string
    }
  } = {},
) => {
  const blockId = 'skript_event_' + skriptId
  const name = options.name ?? 'on ' + skriptId.replace(/_/g, ' ')
  const desc = 'SKRIPT_EVENT_' + skriptId.toUpperCase() + '_DESC'
  const helpUrl = 'https://docs.skriptlang.org/events.html?search=#' + skriptId
  registerSimpleEventBlock(blockId, name, desc, eventValues, cancelable, helpUrl, options.parameter)
}

rsb('anvil_damage', ['event-inventory'])
rsb('anvil_prepare', ['event-inventory', 'event-item stack'], false)
rsb('aoe_cloud_effect', ['event-command sender', 'event-entity', 'event-living entities', 'event-location', 'event-potion effect type', 'event-world'], true, {
  name: 'on area cloud effect',
})
rsb('arm_swing', ['event-player', 'event-world'])
rsb('armor_change', ['event-equipment slot', 'event-player', 'event-slot', 'event-world', 'future event-item stack', 'past event-item stack'], false, {
  parameter: {
    input: createEquipmentSlotArmorFieldDropdown,
    fieldName: 'equipment-slot',
    codePrefix: function (text) {
      return text == '' ? 'on armor change' : 'on ' + text + ' change'
    },
  },
})
rsb('bat_toggle_sleep', ['event-command sender', 'event-entity', 'event-location', 'event-world'])
rsb('beacon_change_effect', ['event-block', 'event-player', 'event-world'])
// TODO https://skripthub.net/docs/?id=13318
rsb('beacon_toggle', ['event-block', 'event-location', 'event-world'], false, {
  parameter: {
    input: () => createPotionEffectTypeFieldDropdown(),
    codePrefix: function (text) {
      return 'on beacon ' + (text === '' ? 'toggle' : text)
    },
  },
})
rsb('bed_enter', ['event-block', 'event-player', 'event-world'])
rsb('bed_leave', ['event-block', 'event-player', 'event-world'])

rsb('join', ['event-player', 'event-world'])
