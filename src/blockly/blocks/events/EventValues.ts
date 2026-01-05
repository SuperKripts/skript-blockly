import * as Blockly from 'blockly/core'
import CodeGenerator from '@/blockly/generators/skript'
import { useWorkspaceStore } from '@/stores/workspace'
import { t } from '@/locales/i18n'

export const EVENT_VALUE = 'skript_event_value'

export const langMap: Record<string, string> = {
  'event-player': 'SKRIPT_EVENT_VALUE_PLAYER',
  'event-world': 'SKRIPT_EVENT_VALUE_WORLD',
  'event-block': 'SKRIPT_EVENT_VALUE_BLOCK',
  'event-inventory': 'SKRIPT_EVENT_VALUE_INVENTORY',
  'event-location': 'SKRIPT_EVENT_VALUE_LOCATION',
  'event-entity': 'SKRIPT_EVENT_VALUE_ENTITY',
  'event-item stack': 'SKRIPT_EVENT_VALUE_ITEM_STACK',
  'event-command sender': 'SKRIPT_EVENT_VALUE_COMMAND_SENDER',
  'event-living entities': 'SKRIPT_EVENT_VALUE_LIVING_ENTITIES',
  'event-potion effect type': 'SKRIPT_EVENT_VALUE_POTION_EFFECT_TYPE',
  'event-equipment slot': 'SKRIPT_EVENT_VALUE_EQUIPMENT_SLOT',
  'event-slot': 'SKRIPT_EVENT_VALUE_SLOT',
  'future event-item stack': 'SKRIPT_EVENT_VALUE_FUTURE_ITEM_STACK',
  'past event-item stack': 'SKRIPT_EVENT_VALUE_PAST_ITEM_STACK',
}

export function createEventValueContextMenu(eventValues: string[]): { text: string; enabled: boolean; callback: () => void }[] {
  const result = []
  for (const eventValue of eventValues) {
    const text = t(langMap[eventValue] ?? eventValue)
    const { workspace } = useWorkspaceStore()
    if (workspace) {
      result.push({
        text: t('SKRIPT_MENU_OPTION', [text]),
        enabled: true,
        callback: function () {
          const block = workspace.newBlock(EVENT_VALUE) as Blockly.BlockSvg
          block.setFieldValue(eventValue, 'event-value')
          block.setFieldValue(text, 'desc')
          block.initSvg()
        },
      })
    }
  }
  return result
}

Blockly.Blocks[EVENT_VALUE] = {
  init: function (this: Blockly.Block) {
    this.appendDummyInput().appendField(new Blockly.FieldTextInput(), 'event-value').setVisible(false)
    this.appendDummyInput().appendField('', 'desc')
    this.setStyle('expression')
    this.setOutput(true)
  },
}

CodeGenerator.forBlock[EVENT_VALUE] = function (this: Blockly.Block) {
  return [this.getFieldValue('event-value'), 0]
}
