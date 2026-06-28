import * as Blockly from 'blockly/core'
import { FieldGridDropdown } from '@blockly/field-grid-dropdown'
import { FieldSearchDropdown } from '@/blockly/inputs/FieldSearchDropdown'
import { t } from '@/locales/i18n'

export type SkriptType = {
  name: string
  options: string[]
}

export const HealReasons: SkriptType = {
  name: 'heal_reason',
  options: ['custom', 'eating', 'ender crystal', 'magic', 'magic regen', 'regen', 'satiated', 'wither', 'wither spawn'],
}

export const CatTypes: SkriptType = {
  name: 'cat_type',
  options: ['tabby', 'black', 'red', 'siamese', 'british shorthair', 'calico', 'persian', 'ragdoll', 'white', 'jellie', 'all black'],
}

export const WolfVariants: SkriptType = {
  name: 'wolf_variant',
  options: ['ashen', 'black', 'chestnut', 'pale', 'rusty', 'snowy', 'spotted', 'striped', 'woods'],
}

export const DamageCauses: SkriptType = {
  name: 'damage_cause',
  options: [
    'contact',
    'entity attack',
    'entity sweep attack',
    'projectile',
    'suffocation',
    'fall',
    'fire',
    'fire tick',
    'melting',
    'lava',
    'drowning',
    'block explosion',
    'entity explosion',
    'void',
    'lightning',
    'starvation',
    'poison',
    'magic',
    'wither',
    'falling block',
    'suicide',
    'thorns',
    'dragon breath',
    'fly into wall',
    'hot floor',
    'cramming',
    'freeze',
    'dryout',
    'custom',
    'sonic boom',
    'kill',
    'world border',
    'campfire',
  ],
}

export const TeleportCauses: SkriptType = {
  name: 'teleport_cause',
  options: ['chorus fruit', 'command', 'end gateway', 'end portal', 'ender pearl', 'nether portal', 'plugin', 'spectate', 'unknown', 'dismount', 'exit bed', 'consumable effect'],
}

export const InventoryCloseReasons: SkriptType = {
  name: 'inventory_close_reason',
  options: ['unknown', 'teleport', 'cant use', 'unloaded', 'open new', 'player', 'disconnect', 'death', 'plugin'],
}

export const GameModes: SkriptType = {
  name: 'game_mode',
  options: ['survival', 'creative', 'adventure', 'spectator'],
}

export const VisualEffects: SkriptType = {
  name: 'visual_effect',
  options: ['area expression', 'effect', 'entityeffect', 'particle'],
}

export const InventoryActions: SkriptType = {
  name: 'inventory_action',
  options: [
    'nothing',
    'pickup all',
    'pickup some',
    'pickup half',
    'pickup one',
    'place all',
    'place some',
    'place one',
    'swap with cursor',
    'drop all cursor',
    'drop one cursor',
    'drop all slot',
    'drop one slot',
    'move to other inventory',
    'hotbar move and readd',
    'hotbar swap',
    'clone stack',
    'collect to cursor',
    'unknown',
    'pickup from bundle',
    'pickup all into bundle',
    'pickup some into bundle',
    'place from bundle',
    'place all into bundle',
    'place some into bundle',
  ],
}

export const InventoryClickTypes: SkriptType = {
  name: 'inventory_click_type',
  options: [
    'left',
    'shift left',
    'right',
    'shift right',
    'window border left',
    'window border right',
    'middle',
    'number key',
    'double click',
    'drop',
    'control drop',
    'creative',
    'unknown',
    'swap offhand',
  ],
}

export const InventoryTypes: SkriptType = {
  name: 'inventory_type',
  options: [
    'chest',
    'dispenser',
    'dropper',
    'furnace',
    'workbench',
    'crafting',
    'enchanting',
    'brewing',
    'player',
    'creative',
    'merchant',
    'ender chest',
    'anvil',
    'beacon',
    'hopper',
    'shulker box',
    'barrel',
    'blast furnace',
    'lectern',
    'smoker',
    'loom',
    'cartography',
    'grindstone',
    'stonecutter',
    'smithing',
    'composter',
    'chiseled bookshelf',
    'decorated pot',
    'crafter',
    'shelf',
    'jukebox',
    'smithing new',
  ],
}

export const SpawnReasons: SkriptType = {
  name: 'spawn_reason',
  options: [
    'bed',
    'beehive',
    'breeding',
    'bucket',
    'build irongolem',
    'build snowman',
    'build wither',
    'chunk gen',
    'command',
    'cured',
    'custom',
    'default',
    'dispense egg',
    'drowned',
    'duplication',
    'egg',
    'ender pearl',
    'explosion',
    'frozen',
    'infection',
    'jockey',
    'lightning',
    'metamorphosis',
    'mount',
    'natural',
    'nether portal',
    'ocelot baby',
    'ominous item spawner',
    'patrol',
    'piglin zombified',
    'potion effect',
    'raid',
    'reinforcements',
    'sheared',
    'shoulder entity',
    'silverfish block',
    'slime split',
    'spawner',
    'spawner egg',
    'spell',
    'trap',
    'village defense',
    'village invasion',
    'trial spawner',
    'enchantment',
    'rehydration',
    'build coppergolem',
  ],
}

export const Difficulties: SkriptType = {
  name: 'difficulty',
  options: ['easy', 'normal', 'hard', 'peaceful'],
}

export const Fireworktypes: SkriptType = {
  name: 'firework_type',
  options: ['ball large', 'creeper', 'ball', 'star', 'burst'],
}

export const ResourcePackStates: SkriptType = {
  name: 'resource_pack_state',
  options: ['accepted', 'declined', 'failed download', 'successfully loaded', 'downloaded', 'invalid url', 'failed reload', 'discarded'],
}

export const SoundCategories: SkriptType = {
  name: 'sound_category',
  options: ['ambient', 'blocks', 'hostile', 'master', 'music', 'neutral', 'players', 'records', 'voice', 'weather', 'ui'],
}

export const PandaGenes: SkriptType = {
  name: 'panda_gene',
  options: ['normal', 'lazy', 'worried', 'playful', 'brown', 'weak', 'aggressive'],
}

export const AttributeTypes: SkriptType = {
  name: 'attribute_type',
  options: [
    'generic armor',
    'generic armor toughness',
    'generic attack damage',
    'generic attack knockback',
    'generic attack speed',
    'generic burning time',
    'generic explosion knockback resistance',
    'generic flying speed',
    'generic follow range',
    'generic gravity',
    'generic jump strength',
    'generic knockback resistance',
    'generic luck',
    'generic max absorption',
    'generic max health',
    'generic movement efficiency',
    'generic movement speed',
    'generic oxygen bonus',
    'generic safe fall distance',
    'generic fall damage multiplier',
    'generic scale',
    'generic step height',
    'generic water movement efficiency',
    'horse jump strength',
    'player block break speed',
    'player block interaction range',
    'player entity interaction range',
    'player mining efficiency',
    'player sneaking speed',
    'player submerged mining speed',
    'player sweeping damage ratio',
    'zombie spawn reinforcements',
    'generic.armor',
    'generic.armor toughness',
    'generic.attack damage',
    'generic.attack knockback',
    'generic.attack speed',
    'generic.burning time',
    'generic.explosion knockback resistance',
    'generic.flying speed',
    'generic.follow range',
    'generic.gravity',
    'generic.jump strength',
    'generic.knockback resistance',
    'generic.luck',
    'generic.max absorption',
    'generic.max health',
    'generic.movement efficiency',
    'generic.movement speed',
    'generic.oxygen bonus',
    'generic.safe fall distance',
    'generic.fall damage multiplier',
    'generic.scale',
    'generic.step height',
    'generic.water movement efficiency',
    'horse.jump strength',
    'player.block break speed',
    'player.block interaction range',
    'player.entity interaction range',
    'player.mining efficiency',
    'player.sneaking speed',
    'player.submerged mining speed',
    'player.sweeping damage ratio',
    'zombie.spawn reinforcements',
    'armor',
    'armor toughness',
    'attack damage',
    'attack knockback',
    'attack speed',
    'burning time',
    'explosion knockback resistance',
    'flying speed',
    'follow range',
    'gravity',
    'jump strength',
    'knockback resistance',
    'luck',
    'max absorption',
    'max health',
    'movement efficiency',
    'movement speed',
    'oxygen bonus',
    'safe fall distance',
    'fall damage multiplier',
    'scale',
    'step height',
    'tempt range',
    'water movement efficiency',
    'block break speed',
    'block interaction range',
    'entity interaction range',
    'mining efficiency',
    'sneaking speed',
    'submerged mining speed',
    'sweeping damage ratio',
    'spawn reinforcements',
    'camera distance',
    'waypoint transmit range',
    'waypoint receive range',
  ],
}

export const Environments: SkriptType = {
  name: 'environment',
  options: ['normal', 'nether', 'the end', 'custom'],
}

export const EntityPotionCauses: SkriptType = {
  name: 'entity_potion_cause',
  options: [
    'area effect cloud',
    'arrow',
    'attack',
    'axolotl',
    'warden',
    'beacon',
    'command',
    'conduit',
    'conversion',
    'death',
    'dolphin',
    'expiration',
    'food',
    'illusion',
    'milk',
    'plugin',
    'potion drink',
    'potion splash',
    'spider spawn',
    'totem',
    'turtle helmet',
    'unknown',
    'villager trade',
    'patrol captain',
    'wither rose',
  ],
}

export const MoonPhases: SkriptType = {
  name: 'moon_phase',
  options: ['first quarter', 'full moon', 'last quarter', 'new moon', 'waning crescent', 'waning gibbous', 'waxing crescent', 'waxing gibbous'],
}

export const QuitReasons: SkriptType = {
  name: 'quit_reason',
  options: ['disconnected', 'erroneous state', 'kicked', 'timed out'],
}

export const TransformReasons: SkriptType = {
  name: 'transform_reason',
  options: ['cured', 'drowned', 'frozen', 'lightning', 'metamorphosis', 'piglin zombified', 'sheared', 'split', 'unknown', 'infection'],
}

export const TeleportFlags: SkriptType = {
  name: 'teleport_flag',
  options: [
    'retain open inventory',
    'retain passengers',
    'retain vehicle',
    'retain direction',
    'retain pitch',
    'retain yaw',
    'retain movement',
    'retain x',
    'retain y',
    'retain z',
  ],
}

export const UnleashReasons: SkriptType = {
  name: 'unleash_reason',
  options: ['distance', 'holder gone', 'player unleash', 'unknown'],
}

export const ItemFlags: SkriptType = {
  name: 'item_flag',
  options: [
    'hide additional tooltip',
    'hide armor trim',
    'hide attributes',
    'hide destroys',
    'hide dye',
    'hide enchants',
    'hide placed on',
    'hide stored enchants',
    'hide unbreakable',
    'hide potion effects',
  ],
}

export const DisplayBillboards: SkriptType = {
  name: 'display_billboard',
  options: ['center', 'fixed', 'horizontal', 'vertical'],
}

export const TextDisplayAlignments: SkriptType = {
  name: 'text_display_alignment',
  options: ['center', 'left', 'right'],
}

export const ItemDisplayTransforms: SkriptType = {
  name: 'item_display_transform',
  options: [
    'firstperson lefthand',
    'firstperson righthand',
    'fixed',
    'ground',
    'gui',
    'head',
    'none',
    'thirdperson lefthand',
    'thirdperson righthand',
    'snow',
    'plains',
    'jungle',
    'taiga',
    'desert',
    'savanna',
    'swamp',
    'leatherworker',
    'mason',
    'fletcher',
    'weaponsmith',
    'toolsmith',
    'librarian',
    'shepherd',
    'farmer',
    'cleric',
    'nitwit',
    'cartographer',
    'armorer',
    'butcher',
    'none',
    'fisherman',
  ],
}

export const ChangeReasons: SkriptType = {
  name: 'change_reason',
  options: ['plugin', 'pickup orb'],
}

export const BannerPatternTypes: SkriptType = {
  name: 'banner_pattern_type',
  options: [
    'base',
    'border',
    'bricks',
    'circle',
    'creeper',
    'cross',
    'curly border',
    'diagonal left',
    'diagonal right',
    'diagonal up left',
    'diagonal up right',
    'flow',
    'flower',
    'globe',
    'gradient',
    'gradient up',
    'guster',
    'half horizontal',
    'half horizontal bottom',
    'half vertical',
    'half vertical right',
    'mojang',
    'piglin',
    'rhombus',
    'skull',
    'small stripes',
    'square bottom left',
    'square bottom right',
    'square top left',
    'square top right',
    'straight cross',
    'stripe bottom',
    'stripe center',
    'stripe downleft',
    'stripe downright',
    'stripe left',
    'stripe middle',
    'stripe right',
    'stripe top',
    'triangle bottom',
    'triangle top',
    'triangles bottom',
    'triangles top',
    'stripe small',
    'diagonal left mirror',
    'diagonal right mirror',
    'circle middle',
    'rhombus middle',
    'half vertical mirror',
    'half horizontal mirror',
  ],
}

export const InputKeys: SkriptType = {
  name: 'input_key',
  options: ['forward', 'backward', 'left', 'right', 'jump', 'sneak', 'sprint'],
}

export const FishingStates: SkriptType = {
  name: 'fishing_state',
  options: ['fishing', 'caught fish', 'caught entity', 'in ground', 'failed attempt', 'reel in', 'bite', 'lured'],
}

export const EquipmentSlots: SkriptType = {
  name: 'equipment_slot',
  options: ['head', 'chest', 'legs', 'feet', 'hand', 'off hand', 'body', 'saddle'],
}

export const PigVariants: SkriptType = {
  name: 'pig_variant',
  options: ['cold', 'temperate', 'warm'],
}

export const ChickenVariants: SkriptType = {
  name: 'chicken_variant',
  options: ['cold', 'temperate', 'warm'],
}

export const CowVariants: SkriptType = {
  name: 'cow_variant',
  options: ['cold', 'temperate', 'warm'],
}

export const FrogVariants: SkriptType = {
  name: 'frog_variant',
  options: ['cold', 'temperate', 'warm', 'employed', 'losing job'],
}

export const DamageTypes: SkriptType = {
  name: 'damage_type',
  options: [
    'arrow',
    'bad respawn point',
    'cactus',
    'campfire',
    'cramming',
    'dragon breath',
    'drown',
    'dry out',
    'ender pearl',
    'explosion',
    'fall',
    'falling anvil',
    'falling block',
    'falling stalactite',
    'fireball',
    'fireworks',
    'fly into wall',
    'freeze',
    'generic',
    'generic kill',
    'hot floor',
    'in fire',
    'in wall',
    'indirect magic',
    'lava',
    'lightning bolt',
    'mace smash',
    'magic',
    'mob attack',
    'mob attack no aggro',
    'mob projectile',
    'on fire',
    'out of world',
    'outside border',
    'player attack',
    'player explosion',
    'sonic boom',
    'spit',
    'stalagmite',
    'starve',
    'sting',
    'sweet berry bush',
    'thorns',
    'thrown',
    'trident',
    'unattributed fireball',
    'wind charge',
    'wither',
    'wither skull',
  ],
}

export const BooleanType: SkriptType = {
  name: 'boolean',
  options: ['true', 'false'],
}

export const Operators: SkriptType = {
  name: 'operator',
  options: ['add', 'subtract', 'multiply', 'divide', 'exponentiate'],
}

export const Verbosity: SkriptType = {
  name: 'verbosity',
  options: ['low', 'normal', 'high', 'very high', 'debug'],
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
    'potioneffect',
    'entitypotioncause',
    'enchantment',
    'damagecause',
    'teleportcause',
    'inventoryaction',
    'clicktype',
    'vector',
    'inventorytype',
    'metadataholder',
    'spawnreason',
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
    'frogvariant',
    'itemcomponent',
    'equippablecomponent',
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

export function createFieldSearchDropdown(type: SkriptType, withEmpty: boolean = false): Blockly.Field<string> {
  return new FieldSearchDropdown(withEmpty ? buildMenuOptionWithEmpty(type) : buildMenuOptions(type), undefined, { cacheKey: type.name })
}

export function buildMenuOptions(type: SkriptType): Blockly.MenuOption[] {
  return type.options.map((e) => [t(`TYPE_${type.name}_${e.replace(/[ -]/g, '_')}`.toUpperCase()), e])
}

export function buildMenuOptionWithEmpty(type: SkriptType): Blockly.MenuOption[] {
  return [[t(`TYPE_${type.name}_EMPTY`.toUpperCase()), ''], ...buildMenuOptions(type)]
}
