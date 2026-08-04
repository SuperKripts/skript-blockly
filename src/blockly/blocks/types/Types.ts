import * as Blockly from 'blockly/core'
import { FieldGridDropdown } from '@blockly/field-grid-dropdown'
import { FieldSearchDropdown } from '@/blockly/inputs/FieldSearchDropdown'
import { t } from '@/locales/i18n'
import { createSkriptDefinition, getSkriptHubDocUrl, type SkriptBlockDefinition } from '../SkriptBlock'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'

export type SkriptType = {
  name: string
  type: string
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
  type: 'visualeffect',
  options: ['area expression', 'effect', 'entityeffect', 'particle'],
}

export const Types: SkriptType = {
  name: 'type',
  type: 'type',
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

export function getTempLangKey(name: string, value: string) {
  return `FIELD_OPTION_${name}_${value.replace(/[ '-]/g, '_')}`.toUpperCase()
}

export function createTempFieldDropdown(name: string, args: string[], validator?: Blockly.FieldValidator<string>): Blockly.Field<string> {
  const options = args.map((e): Blockly.MenuOption => [t(getTempLangKey(name, e)), e])
  return args.length < 9 ? new Blockly.FieldDropdown(options, validator) : new FieldGridDropdown(options, validator)
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
    return `TYPE_${name}_${value.replace(/[ '-]/g, '_')}`.toUpperCase()
  }

  private buildOption(name: string, value: string): Blockly.MenuOption {
    const langKey = this.getLangKey(name, value)
    const translated = t(langKey)
    return [translated, value]
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

export function createTypeBlock(type: SkriptType, title: string, docId: number): Blockly.utils.toolbox.BlockInfo {
  const blockKey = `type_${type.name}`
  const definition = createSkriptDefinition({
    title,
    syntaxType: 'type',
    docUrl: getSkriptHubDocUrl(docId),
  })
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_() {
      this.appendDummyInput().appendField(createFieldSearchDropdown(type), title)
    },
    initStyle_() {
      this.setOutput(true, type.type)
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, _generate: SkriptCodeGenerator) => {
    return [block.getFieldValue(title), 0]
  }
  return { kind: 'block', type: blockKey }
}
