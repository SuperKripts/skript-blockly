import { t } from '@/locales/i18n'
import * as Blockly from 'blockly/core'
import CodeGenerator from '@/blockly/generators/skript'
import { isSkriptEventBlock } from './SkriptEventBlock'
import { createSkriptDefinition, getSkriptHubDocUrl, registerContentMenuGetOption, type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'

export const EVENT_VALUE_BLOCK_TYPE = 'expression_event_value'

export const SupportedEventValues = {
  'event-block': 'block',
  'event-location': 'location',
  'event-world': 'world',
  'past event-block': 'block',
  'event-player': 'player',
  'event-command sender': 'commandsender',
  'event-entity': 'entity',
  'event-entity type': 'entitytype',
  'event-item stack': 'itemstack',
  'event-projectile': 'projectile',
  'event-spawn reason': 'spawnreason',
  'event-chunk': 'chunk',
  'event-block data': 'blockdata',
  'future event-block data': 'blockdata',
  'future event-block': 'block',
  'event-quit reason': 'quitreason',
  'event-vehicle': 'vehicle',
  'event-teleport cause': 'teleportcause',
  'past event-chunk': 'chunk',
  'past event-location': 'location',
  'event-inventory': 'inventory',
  'event-inventory close reason': 'inventoryclosereason',
  'event-slot': 'slot',
  'event-living entity': 'livingentity',
  'past event-world': 'world',
  'event-region': 'region',
  'event-dropped item': 'itementity',
  'event-commandsender': 'commandsender',
  'event-experience point': 'experience',
  'event-click type': 'clicktype',
  'event-inventory action': 'inventoryaction',
  'event-text': 'string',
  'event-enchantment types': 'enchantment',
  'event-blocks': 'block',
  'event-colors': 'color',
  'event-firework effect': 'fireworkeffect',
  'event-unleash reason': 'unleashreason',
  'event-entity potion cause': 'potioncause',
  'event-potion effect': 'potioneffect',
  'event-potion effect type': 'potioneffecttype',
  'past event-potion effect': 'potioneffect',
  'event-entities': 'entity',
  'event-item stacks': 'itemstack',
  'event-texts': 'string',
  'past event-item stack': 'itemstack',
  'past event-texts': 'string',
  'event-living entities': 'livingentity',
  'event-damage cause': 'damagecause',
  'event-damage source': 'damagesource',
  'event-direction': 'direction',
  'event-teleportcause': 'teleportcause',
  'future event-item stack': 'itemstack',
  'event-loot context': 'lootcontext',
  'event-loot table': 'loottable',
  'event-inventories': 'inventory',
  'event-slots': 'slot',
  'past event-slot': 'slot',
  'event-item type': 'itemtype',
  'event-time span': 'timespan',
  'future event-location': 'location',
  'future event-blocks': 'block',
  'future event-inventory': 'inventory',
  'event-fishing state': 'fishingstate',
  'event-experience cooldown change reason': 'experiencecooldownchangereason',
  'past event-time span': 'timespan',
  'event-transform reason': 'transformreason',
  'event-number': 'number',
  'event-worldborder': 'worldborder',
  'past event-number': 'number',
  'future event-dropped item': 'itementity',
  'event-input keys': 'inputkey',
  'past event-input keys': 'inputkey',
  'event-equipment slot': 'equipmentslot',
  'event-heal reason': 'healreason',
}

type EventValue = keyof typeof SupportedEventValues

export function generateEventValueLangKey(eventValue: EventValue) {
  return ('EVENT_VALUE_' + eventValue.replace(/ /g, '_').replace(/event-/g, '')).toUpperCase()
}

for (const eventValue of Object.keys(SupportedEventValues) as EventValue[]) {
  if (!Blockly.ContextMenuRegistry.registry.getItem(eventValue)) {
    const eventValueLangKey = generateEventValueLangKey(eventValue)
    registerContentMenuGetOption(
      eventValue,
      100,
      (workspace: Blockly.WorkspaceSvg) => {
        const newBlock = workspace.newBlock(EVENT_VALUE_BLOCK_TYPE) as SkriptBlock
        newBlock.extra_ = { eventValue }
        newBlock.updateShape_()
        newBlock.initSvg()
      },
      (block: Blockly.Block) => (isSkriptEventBlock(block) ? block.eventValues_.includes(eventValue) : false),
      eventValueLangKey,
    )
  }
}

const definition = createSkriptDefinition({
  title: 'Event Value',
  syntaxType: 'expression',
  docUrl: getSkriptHubDocUrl(0),
})

const mixin: Partial<SkriptBlockDefinition> = {
  initShape_: function (this: SkriptBlock) {
    this.appendDummyInput().appendField('', 'desc')
  },
  updateShape_: function (this: SkriptBlock) {
    const eventValue = this.extra_.eventValue as EventValue
    if (eventValue) {
      this.setFieldValue(t(generateEventValueLangKey(eventValue)), 'desc')
      this.setOutput(true, SupportedEventValues[eventValue])
    }
  },
}
Blockly.Blocks[EVENT_VALUE_BLOCK_TYPE] = Object.assign(definition, mixin)

CodeGenerator.forBlock[EVENT_VALUE_BLOCK_TYPE] = function (this: SkriptBlock) {
  return [this.extra_.eventValue as EventValue, 0]
}
