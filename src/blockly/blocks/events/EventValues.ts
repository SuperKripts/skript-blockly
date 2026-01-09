import { t } from '@/locales/i18n'
import * as Blockly from 'blockly/core'
import CodeGenerator from '@/blockly/generators/skript'
import { type SkriptEventBlock } from '@/blockly/blocks/events/EventBlock'

export const EVENT_VALUE_BLOCK_TYPE = 'expression_event_value'

export const SuppertedEventValues = [
  'event-block',
  'event-location',
  'event-world',
  'past event-block',
  'event-player',
  'event-command sender',
  'event-entity',
  'event-entity type',
  'event-item stack',
  'event-projectile',
  'event-spawn reason',
  'event-chunk',
  'event-block data',
  'future event-block data',
  'future event-block',
  'event-quit reason',
  'event-vehicle',
  'event-teleport cause',
  'past event-chunk',
  'past event-location',
  'event-inventory',
  'event-inventory close reason',
  'event-slot',
  'event-living entity',
  'past event-world',
  'event-region',
  'event-dropped item',
  'event-commandsender',
  'event-experience point',
  'event-click type',
  'event-inventory action',
  'event-text',
  'event-enchantment types',
  'event-blocks',
  'event-colors',
  'event-firework effect',
  'event-unleash reason',
  'event-entity potion cause',
  'event-potion effect',
  'event-potion effect type',
  'past event-potion effect',
  'event-entities',
  'event-item stacks',
  'event-texts',
  'past event-item stack',
  'past event-texts',
  'event-living entities',
  'event-damage cause',
  'event-damage source',
  'event-direction',
  'event-teleportcause',
  'future event-item stack',
  'event-loot context',
  'event-loot table',
  'event-inventories',
  'event-slots',
  'past event-slot',
  'event-item type',
  'event-time span',
  'future event-location',
  'future event-blocks',
  'future event-inventory',
  'event-fishing state',
  'event-experience cooldown change reason',
  'past event-time span',
  'event-transform reason',
  'event-number',
  'event-worldborder',
  'past event-number',
  'future event-dropped item',
  'event-input keys',
  'past event-input keys',
  'event-equipment slot',
  'event-heal reason',
] as const

type EventValue = (typeof SuppertedEventValues)[number]

export function generateEventValueLangKey(eventValue: EventValue) {
  return ('EVENT_VALUE_' + eventValue.replace(/ /g, '_').replace(/event-/g, '')).toUpperCase()
}

for (const eventValue of SuppertedEventValues) {
  if (!Blockly.ContextMenuRegistry.registry.getItem(eventValue)) {
    const eventValueLangKey = generateEventValueLangKey(eventValue)
    Blockly.ContextMenuRegistry.registry.register({
      id: eventValue,
      scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
      weight: 100,
      callback: (scope: Blockly.ContextMenuRegistry.Scope) => {
        const block = scope.block
        if (block) {
          if (block.workspace.isFlyout) {
            const newBlock = block.workspace.targetWorkspace?.newBlock(EVENT_VALUE_BLOCK_TYPE) as EventValueBlock
            newBlock.eventValue_ = eventValue
            newBlock.updateShape_()
            newBlock.initSvg()
          } else {
            const newBlock = block.workspace.newBlock(EVENT_VALUE_BLOCK_TYPE) as EventValueBlock
            newBlock.eventValue_ = eventValue
            newBlock.updateShape_()
            newBlock.initSvg()
          }
        }
      },
      displayText: () => {
        return t('MENU_OPTION_GET', [t(eventValueLangKey)])
      },
      preconditionFn: (scope: Blockly.ContextMenuRegistry.Scope) => {
        if (scope.block?.getStyleName() === 'event') {
          const block = scope.block as SkriptEventBlock
          if (block.eventValues_.includes(eventValue)) {
            return 'enabled'
          }
        }
        return 'hidden'
      },
    })
  }
}

type EventValueBlock = Blockly.BlockSvg & {
  eventValue_: EventValue
  updateShape_: () => void
}

Blockly.Blocks[EVENT_VALUE_BLOCK_TYPE] = {
  init: function (this: EventValueBlock) {
    this.appendDummyInput().appendField('', 'desc')
    this.setStyle('expression')
    this.setOutput(true)
  },
  saveExtraState: function (this: EventValueBlock): { eventValue: EventValue } {
    return { eventValue: this.eventValue_ }
  },
  loadExtraState: function (this: EventValueBlock, state: { eventValue: EventValue }) {
    this.eventValue_ = state.eventValue
    this.updateShape_()
  },
  updateShape_: function (this: EventValueBlock) {
    this.setFieldValue(t(generateEventValueLangKey(this.eventValue_)), 'desc')
  },
}

CodeGenerator.forBlock[EVENT_VALUE_BLOCK_TYPE] = function (this: EventValueBlock) {
  return [this.eventValue_, 0]
}
