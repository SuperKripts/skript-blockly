import * as Blockly from 'blockly/core'
import { FieldGridDropdown } from '@blockly/field-grid-dropdown'
import { FieldSearchDropdown } from '@/blockly/inputs/FieldSearchDropdown'
import { t } from '@/locales/i18n'
import { Entities } from './Entities'
import { BlockDatas, ItemTypes } from './Materials'

export type SkriptType = {
  name: string
  options: string[]
}

export type SkriptTypes = {
  name: string
  types: SkriptType[]
}

export function isSkriptTypes(type: SkriptType | SkriptTypes): type is SkriptTypes {
  return 'types' in type
}

export const VisualEffects: SkriptType = {
  name: 'visual_effect',
  options: ['area expression', 'effect', 'entityeffect', 'particle'],
}

export const EntitiesItemBlock: SkriptTypes = {
  name: 'entities_item_block',
  types: [Entities, ItemTypes, BlockDatas],
}

export const Types: SkriptType = {
  name: 'type',
  options: [
    'object',
    'number',
    'integer',
    'long',
    'short',
    'byte',
    'double',
    'float',
    'boolean',
    'string',
    'chunk',
    'uuid',
    'entity',
    'livingentity',
    'projectile',
    'block',
    'location',
    'world',
    'worldborder',
    'inventory',
    'player',
    'offlineplayer',
    'commandsender',
    'inventoryholder',
    'gamemode',
    'material',
    'itemstack',
    'itementity',
    'itemflag',
    'biome',
    'potioneffecttype',
    'potioneffecttypecategory',
    'potioneffect',
    'skriptpotioneffect',
    'potioncause',
    'potionaction',
    'enchantment',
    'damagecause',
    'teleportcause',
    'inventoryaction',
    'clicktype',
    'vector',
    'inventorytype',
    'metadataholder',
    'spawnreason',
    'respawnreason',
    'cachedservericon',
    'difficulty',
    'fireworkeffect',
    'fireworktype',
    'soundcategory',
    'blockdata',
    'healreason',
    'cattype',
    'wolfvariant',
    'gamerule',
    'attributetype',
    'enchantmentoffer',
    'environment',
    'moonphase',
    'resourcepackstate',
    'gene',
    'gamerulevalue',
    'quitreason',
    'inventoryclosereason',
    'transformreason',
    'unleashreason',
    'teleportflag',
    'display',
    'billboard',
    'textalignment',
    'itemdisplaytransform',
    'minecrafttag',
    'experiencecooldownchangereason',
    'inputkey',
    'villagertype',
    'villagerprofession',
    'entitysnapshot',
    'loottable',
    'lootcontext',
    'bannerpatterntype',
    'bannerpattern',
    'vehicle',
    'fishingstate',
    'equipmentslot',
    'pigvariant',
    'chickenvariant',
    'cowvariant',
    'villagercareerchangereason',
    'damagesource',
    'damagetype',
    'textcomponent',
    'audience',
    'frogvariant',
    'itemcomponent',
    'equippablecomponent',
    'nameable',
    'gameeffect',
    'entityeffect',
    'particle',
    'bukkitparticle',
    'convergingparticle',
    'directionalparticle',
    'scalableparticle',
    'zombienautilusvariant',
    'weathertype',
    'entitytype',
    'entitydata',
    'itemtype',
    'time',
    'timespan',
    'timeperiod',
    'date',
    'direction',
    'slot',
    'color',
    'structuretype',
    'enchantmenttype',
    'experience',
    'experience.pattern',
    'classinfo',
    'visualeffect',
    'queue',
    'script',
    'config',
    'node',
    'executable',
    'function',
    'named',
    'numbered',
    'valued',
    'containing',
    'money',
    'region',
    'quaternion',
  ],
}

export function createTempFieldDropdown(name: string, args: string[]): Blockly.Field<string> {
  const options = args.map((e): Blockly.MenuOption => [t(`FIELD_OPTION_${name}_${e == '' ? 'DEFAULT' : e.replace(/[ -]/g, '_')}`.toUpperCase()), e])
  return args.length < 9 ? new Blockly.FieldDropdown(options) : new FieldGridDropdown(options)
}

export function createFieldDropdown(type: SkriptType, withEmpty: boolean = false): Blockly.Field<string> {
  const options = dropdownCache.getOptions(type, withEmpty)
  if (options.length < 9) {
    return new Blockly.FieldDropdown(options)
  } else if (options.length <= 30) {
    return new FieldGridDropdown(options)
  }
  return createFieldSearchDropdown(type, withEmpty)
}

export function createFieldSearchDropdown(type: SkriptType | SkriptTypes, withEmpty: boolean = false): Blockly.Field<string> {
  return new FieldSearchDropdown(dropdownCache.getOptions(type, withEmpty), undefined, { cacheKey: type.name })
}

class DropdownCache {
  private readonly cache = new Map<string, Blockly.MenuOption[]>()
  private readonly cacheWithEmpty = new Map<string, Blockly.MenuOption[]>()

  private getCache(withEmpty: boolean) {
    return withEmpty ? this.cacheWithEmpty : this.cache
  }

  private getLangKey(name: string, value: string) {
    return `TYPE_${name}_${value.replace(/[ -]/g, '_')}`.toUpperCase()
  }

  private buildOption(name: string, value: string): Blockly.MenuOption {
    return [t(this.getLangKey(name, value)), value]
  }

  private buildOptions(type: SkriptType | SkriptTypes): Blockly.MenuOption[] {
    return isSkriptTypes(type) ? type.types.flatMap((e) => this.buildOptions(e)) : type.options.map((e) => this.buildOption(type.name, e))
  }

  getOptions(type: SkriptType | SkriptTypes, withEmpty: boolean = false): Blockly.MenuOption[] {
    const cache = this.getCache(withEmpty)
    if (cache.has(type.name)) {
      return cache.get(type.name)!
    }

    const options = this.buildOptions(type)
    if (withEmpty) {
      options.unshift([t(this.getLangKey(type.name, 'EMPTY')), ''])
    }
    cache.set(type.name, options)
    return options
  }
}

export const dropdownCache = new DropdownCache()
