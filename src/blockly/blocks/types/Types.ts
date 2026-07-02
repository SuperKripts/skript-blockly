import * as Blockly from 'blockly/core'
import { FieldGridDropdown } from '@blockly/field-grid-dropdown'
import { FieldSearchDropdown } from '@/blockly/inputs/FieldSearchDropdown'
import { t } from '@/locales/i18n'

export type SkriptType = {
  name: string
  options: string[]
}

export const VisualEffects: SkriptType = {
  name: 'visual_effect',
  options: ['area expression', 'effect', 'entityeffect', 'particle'],
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
  const options = withEmpty ? buildMenuOptionWithEmpty(type) : buildMenuOptions(type)
  if (options.length < 9) {
    return new Blockly.FieldDropdown(options)
  } else if (options.length <= 30) {
    return new FieldGridDropdown(options)
  }
  return createFieldSearchDropdown(type, withEmpty)
}

export function createFieldSearchDropdown(type: SkriptType | SkriptType[], withEmpty: boolean = false): Blockly.Field<string> {
  if (Array.isArray(type)) {
    const name = type.map((e) => e.name).join('_')
    const options = type.flatMap((e) => buildMenuOptions(e))
    options.unshift([t(`TYPE_${name}_EMPTY`.toUpperCase()), ''])
    return new FieldSearchDropdown(options, undefined, { cacheKey: name })
  }
  return new FieldSearchDropdown(withEmpty ? buildMenuOptionWithEmpty(type) : buildMenuOptions(type), undefined, { cacheKey: type.name })
}

const cache = new Map<string, Blockly.MenuOption[]>()
const cacheWithEmpty = new Map<string, Blockly.MenuOption[]>()

export function buildMenuOptions(type: SkriptType): Blockly.MenuOption[] {
  if (cache.has(type.name)) {
    return cache.get(type.name)!
  }
  const options = type.options.map((e) => [t(`TYPE_${type.name}_${e.replace(/[ -]/g, '_')}`.toUpperCase()), e] as Blockly.MenuOption)
  cache.set(type.name, options)
  return options
}

export function buildMenuOptionWithEmpty(type: SkriptType): Blockly.MenuOption[] {
  if (cacheWithEmpty.has(type.name)) {
    return cacheWithEmpty.get(type.name)!
  }
  const options = buildMenuOptions(type)
  cacheWithEmpty.set(type.name, [[t(`TYPE_${type.name}_EMPTY`.toUpperCase()), ''], ...options])
  return options
}
