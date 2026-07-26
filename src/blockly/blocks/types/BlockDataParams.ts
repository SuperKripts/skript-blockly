import { t } from '@/locales/i18n'
import { BlockDatas } from './Materials'

export const blockOptions: string[] = BlockDatas.options

export interface BlockDataParam {
  key: string
  values: string[]
}

export interface BlockDataState {
  blockName: string
  params: Record<string, string>
}

const blockFamilies: Record<string, BlockDataParam[]> = {
  stairs: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'half', values: ['top', 'bottom'] },
    { key: 'shape', values: ['straight', 'inner_left', 'inner_right', 'outer_left', 'outer_right'] },
    { key: 'waterlogged', values: ['true', 'false'] },
  ],
  slab: [
    { key: 'type', values: ['top', 'bottom', 'double'] },
    { key: 'waterlogged', values: ['true', 'false'] },
  ],
  fence: [
    { key: 'north', values: ['true', 'false'] },
    { key: 'south', values: ['true', 'false'] },
    { key: 'east', values: ['true', 'false'] },
    { key: 'west', values: ['true', 'false'] },
    { key: 'waterlogged', values: ['true', 'false'] },
  ],
  fence_gate: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'open', values: ['true', 'false'] },
    { key: 'in_wall', values: ['true', 'false'] },
    { key: 'powered', values: ['true', 'false'] },
  ],
  door: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'half', values: ['upper', 'lower'] },
    { key: 'hinge', values: ['left', 'right'] },
    { key: 'open', values: ['true', 'false'] },
    { key: 'powered', values: ['true', 'false'] },
  ],
  trapdoor: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'half', values: ['top', 'bottom'] },
    { key: 'open', values: ['true', 'false'] },
    { key: 'powered', values: ['true', 'false'] },
    { key: 'waterlogged', values: ['true', 'false'] },
  ],
  button: [
    { key: 'face', values: ['floor', 'wall', 'ceiling'] },
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'powered', values: ['true', 'false'] },
  ],
  pressure_plate: [{ key: 'powered', values: ['true', 'false'] }],
  lever: [
    { key: 'face', values: ['floor', 'wall', 'ceiling'] },
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'powered', values: ['true', 'false'] },
  ],
  torch: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'lit', values: ['true', 'false'] },
  ],
  wall_torch: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'lit', values: ['true', 'false'] },
  ],
  redstone_torch: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'lit', values: ['true', 'false'] },
    { key: 'unstable', values: ['true', 'false'] },
  ],
  dispenser: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'triggered', values: ['true', 'false'] },
  ],
  dropper: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'triggered', values: ['true', 'false'] },
  ],
  piston: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'extended', values: ['true', 'false'] },
    { key: 'short', values: ['true', 'false'] },
  ],
  sticky_piston: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'extended', values: ['true', 'false'] },
    { key: 'short', values: ['true', 'false'] },
  ],
  observer: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'powered', values: ['true', 'false'] },
  ],
  hopper: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'enabled', values: ['true', 'false'] },
    { key: 'powered', values: ['true', 'false'] },
  ],
  rail: [
    {
      key: 'shape',
      values: ['north_south', 'east_west', 'ascending_east', 'ascending_west', 'ascending_north', 'ascending_south', 'south_east', 'south_west', 'north_east', 'north_west'],
    },
    { key: 'waterlogged', values: ['true', 'false'] },
  ],
  powered_rail: [
    { key: 'shape', values: ['north_south', 'east_west', 'ascending_east', 'ascending_west', 'ascending_north', 'ascending_south'] },
    { key: 'powered', values: ['true', 'false'] },
    { key: 'waterlogged', values: ['true', 'false'] },
  ],
  detector_rail: [
    { key: 'shape', values: ['north_south', 'east_west', 'ascending_east', 'ascending_west', 'ascending_north', 'ascending_south'] },
    { key: 'powered', values: ['true', 'false'] },
    { key: 'waterlogged', values: ['true', 'false'] },
  ],
  activator_rail: [
    { key: 'shape', values: ['north_south', 'east_west', 'ascending_east', 'ascending_west', 'ascending_north', 'ascending_south'] },
    { key: 'powered', values: ['true', 'false'] },
    { key: 'waterlogged', values: ['true', 'false'] },
  ],
  redstone_wire: [
    { key: 'north', values: ['up', 'side', 'none'] },
    { key: 'south', values: ['up', 'side', 'none'] },
    { key: 'east', values: ['up', 'side', 'none'] },
    { key: 'west', values: ['up', 'side', 'none'] },
    { key: 'power', values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'] },
  ],
  comparator: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'mode', values: ['compare', 'subtract'] },
    { key: 'powered', values: ['true', 'false'] },
    { key: 'distance', values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'] },
  ],
  repeater: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'delay', values: ['1', '2', '3', '4'] },
    { key: 'powered', values: ['true', 'false'] },
    { key: 'locked', values: ['true', 'false'] },
  ],

  log: [
    { key: 'axis', values: ['x', 'y', 'z'] },
    { key: 'stripped', values: ['true', 'false'] },
  ],
  wood: [
    { key: 'axis', values: ['x', 'y', 'z'] },
    { key: 'stripped', values: ['true', 'false'] },
  ],
  bamboo_block: [{ key: 'axis', values: ['x', 'y', 'z'] }],
  leaves: [
    { key: 'distance', values: ['1', '2', '3', '4', '5', '6', '7'] },
    { key: 'persistent', values: ['true', 'false'] },
    { key: 'waterlogged', values: ['true', 'false'] },
  ],
  sapling: [{ key: 'age', values: ['0', '1', '2', '3', '4'] }],
  bamboo_sapling: [
    { key: 'stage', values: ['0', '1'] },
    { key: 'leaves', values: ['true', 'false'] },
    { key: 'waterlogged', values: ['true', 'false'] },
  ],
  crops: [{ key: 'age', values: ['0', '1', '2', '3', '4', '5', '6', '7'] }],
  beetroot: [{ key: 'age', values: ['0', '1', '2', '3'] }],
  stem: [{ key: 'age', values: ['0', '1', '2', '3', '4', '5', '6', '7'] }],
  melon_stem: [
    { key: 'age', values: ['0', '1', '2', '3', '4', '5', '6', '7'] },
    { key: 'attached', values: ['true', 'false'] },
  ],
  cactus: [{ key: 'age', values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'] }],
  sugar_cane: [{ key: 'age', values: ['0', '1', '2', '3'] }],
  kelp: [
    { key: 'age', values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'] },
  ],
  cocoa: [
    { key: 'age', values: ['0', '1', '2'] },
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
  ],
  sign: [
    { key: 'facing', values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'] },
    { key: 'waterlogged', values: ['true', 'false'] },
  ],
  hanging_sign: [
    { key: 'attached', values: ['true', 'false'] },
    { key: 'facing', values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'] },
    { key: 'waterlogged', values: ['true', 'false'] },
  ],
  banner: [
    { key: 'facing', values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'] },
    { key: 'waterlogged', values: ['true', 'false'] },
  ],
  bed: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'occupied', values: ['true', 'false'] },
    { key: 'part', values: ['foot', 'head'] },
  ],
  candle: [
    { key: 'lit', values: ['true', 'false'] },
    { key: 'waterlogged', values: ['true', 'false'] },
    { key: 'candles', values: ['1', '2', '3', '4'] },
  ],
  campfire: [
    { key: 'lit', values: ['true', 'false'] },
    { key: 'waterlogged', values: ['true', 'false'] },
  ],
  beehive: [{ key: 'honey_level', values: ['0', '1', '2', '3', '4', '5'] }],
  composter: [{ key: 'level', values: ['0', '1', '2', '3', '4', '5', '6', '7', '8'] }],
  barrel: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'open', values: ['true', 'false'] },
  ],
  waterlogged_only: [{ key: 'waterlogged', values: ['true', 'false'] }],
  brewing_stand: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'waterlogged', values: ['true', 'false'] },
  ],
  level_block: [{ key: 'level', values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'] }],
  furnace: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'lit', values: ['true', 'false'] },
  ],
  chest: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'waterlogged', values: ['true', 'false'] },
  ],
  ender_chest: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'waterlogged', values: ['true', 'false'] },
  ],
  trapped_chest: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'waterlogged', values: ['true', 'false'] },
  ],
  shulker_box: [{ key: 'facing', values: ['up', 'down', 'north', 'south', 'east', 'west'] }],
  cake: [{ key: 'bites', values: ['0', '1', '2', '3', '4', '5', '6'] }],
  candle_cake: [
    { key: 'lit', values: ['true', 'false'] },
    { key: 'waterlogged', values: ['true', 'false'] },
  ],
  snow: [{ key: 'layers', values: ['1', '2', '3', '4', '5', '6', '7', '8'] }],
  bell: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'powered', values: ['true', 'false'] },
  ],
  anvil: [{ key: 'facing', values: ['east', 'west', 'south', 'north'] }],
  coral: [
    { key: 'dead', values: ['true', 'false'] },
    { key: 'waterlogged', values: ['true', 'false'] },
  ],
  coral_fan: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'dead', values: ['true', 'false'] },
    { key: 'waterlogged', values: ['true', 'false'] },
  ],
  coral_wall_fan: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'dead', values: ['true', 'false'] },
  ],
  sea_pickle: [
    { key: 'waterlogged', values: ['true', 'false'] },
    { key: 'dead', values: ['true', 'false'] },
  ],
  big_dripleaf: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'waterlogged', values: ['true', 'false'] },
    { key: 'tilt', values: ['none', 'unstable', 'partial', 'full'] },
  ],
  small_dripleaf: [{ key: 'waterlogged', values: ['true', 'false'] }],
  dripleaf_stem: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'waterlogged', values: ['true', 'false'] },
  ],
  pointed_dripstone: [
    { key: 'thickness', values: ['tip', 'middle', 'base', 'mass'] },
    { key: 'vertical_direction', values: ['up', 'down'] },
  ],
  glow_lichen: [
    { key: 'waterlogged', values: ['true', 'false'] },
    { key: 'age', values: ['0', '1', '2', '3'] },
  ],
  hanging_roots: [{ key: 'waterlogged', values: ['true', 'false'] }],
  cave_vines: [
    { key: 'age', values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'] },
  ],
  nether_wart: [{ key: 'age', values: ['0', '1', '2', '3'] }],
  chorus_flower: [{ key: 'age', values: ['0', '1', '2', '3', '4', '5'] }],
  fungus: [{ key: 'age', values: ['0', '1', '2', '3'] }],
  mossy: [{ key: 'seed', values: ['true', 'false'] }],
  chiseled_bookshelf: [
    { key: 'slot_0', values: ['true', 'false'] },
    { key: 'slot_1', values: ['true', 'false'] },
    { key: 'slot_2', values: ['true', 'false'] },
    { key: 'slot_3', values: ['true', 'false'] },
    { key: 'slot_4', values: ['true', 'false'] },
    { key: 'slot_5', values: ['true', 'false'] },
  ],
  copper_door: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'half', values: ['upper', 'lower'] },
    { key: 'hinge', values: ['left', 'right'] },
    { key: 'open', values: ['true', 'false'] },
    { key: 'powered', values: ['true', 'false'] },
  ],
  copper_trapdoor: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'half', values: ['top', 'bottom'] },
    { key: 'open', values: ['true', 'false'] },
    { key: 'powered', values: ['true', 'false'] },
    { key: 'waterlogged', values: ['true', 'false'] },
  ],
  copper_bulb: [
    { key: 'powered', values: ['true', 'false'] },
    { key: 'lit', values: ['true', 'false'] },
    { key: 'waterlogged', values: ['true', 'false'] },
  ],
  copper_grate: [{ key: 'waterlogged', values: ['true', 'false'] }],
  copper_chest: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'waterlogged', values: ['true', 'false'] },
  ],
  sculk_sensor: [{ key: 'powered', values: ['true', 'false'] }],
  calibrated_sculk_sensor: [
    { key: 'facing', values: ['east', 'west', 'south', 'north'] },
    { key: 'powered', values: ['true', 'false'] },
  ],
  sculk_shrieker: [{ key: 'powered', values: ['true', 'false'] }],
  sculk_catalyzer: [{ key: 'charge', values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] }],
  sculk_vein: [{ key: 'spread', values: ['0', '1'] }],
  decor_pot: [{ key: 'facing', values: ['east', 'west', 'south', 'north'] }],
  flower_pot: [{ key: 'facing', values: ['east', 'west', 'south', 'north'] }],
}

const WOOD_TYPES = ['oak', 'birch', 'spruce', 'jungle', 'dark oak', 'acacia', 'cherry', 'mangrove']
const CRIMSON_WARPED_TYPES = ['crimson', 'warped']
const BAMBOO = 'bamboo'

type WoodPartConfig = { suffix: string; family: string }

const woodPartConfigs: WoodPartConfig[] = [
  { suffix: 'log', family: 'log' },
  { suffix: 'wood', family: 'wood' },
  { suffix: 'planks', family: 'planks' },
  { suffix: 'leaves', family: 'leaves' },
  { suffix: 'sapling', family: 'sapling' },
  { suffix: 'slab', family: 'slab' },
  { suffix: 'stairs', family: 'stairs' },
  { suffix: 'fence', family: 'fence' },
  { suffix: 'fence gate', family: 'fence_gate' },
  { suffix: 'door', family: 'door' },
  { suffix: 'trapdoor', family: 'trapdoor' },
  { suffix: 'button', family: 'button' },
  { suffix: 'pressure plate', family: 'pressure_plate' },
  { suffix: 'sign', family: 'sign' },
  { suffix: 'hanging sign', family: 'hanging_sign' },
  { suffix: 'wall sign', family: 'sign' },
  { suffix: 'wall hanging sign', family: 'hanging_sign' },
]

const crimsonWarpedPartConfigs: WoodPartConfig[] = [
  { suffix: 'stem', family: 'log' },
  { suffix: 'hyphae', family: 'wood' },
  { suffix: 'planks', family: 'planks' },
  { suffix: 'slab', family: 'slab' },
  { suffix: 'stairs', family: 'stairs' },
  { suffix: 'fence', family: 'fence' },
  { suffix: 'fence gate', family: 'fence_gate' },
  { suffix: 'door', family: 'door' },
  { suffix: 'trapdoor', family: 'trapdoor' },
  { suffix: 'button', family: 'button' },
  { suffix: 'pressure plate', family: 'pressure_plate' },
  { suffix: 'sign', family: 'sign' },
  { suffix: 'hanging sign', family: 'hanging_sign' },
  { suffix: 'wall sign', family: 'sign' },
  { suffix: 'wall hanging sign', family: 'hanging_sign' },
]

const bambooPartConfigs: WoodPartConfig[] = [
  { suffix: 'block', family: 'bamboo_block' },
  { suffix: 'mosaic', family: 'planks' },
  { suffix: 'mosaic slab', family: 'slab' },
  { suffix: 'mosaic stairs', family: 'stairs' },
  { suffix: 'planks', family: 'planks' },
  { suffix: 'sapling', family: 'bamboo_sapling' },
  { suffix: 'slab', family: 'slab' },
  { suffix: 'stairs', family: 'stairs' },
  { suffix: 'fence', family: 'fence' },
  { suffix: 'fence gate', family: 'fence_gate' },
  { suffix: 'door', family: 'door' },
  { suffix: 'trapdoor', family: 'trapdoor' },
  { suffix: 'button', family: 'button' },
  { suffix: 'pressure plate', family: 'pressure_plate' },
  { suffix: 'sign', family: 'sign' },
  { suffix: 'hanging sign', family: 'hanging_sign' },
  { suffix: 'wall sign', family: 'sign' },
  { suffix: 'wall hanging sign', family: 'hanging_sign' },
]

function generateWoodMap(): Record<string, string> {
  const map: Record<string, string> = {}
  for (const wood of WOOD_TYPES) {
    for (const cfg of woodPartConfigs) {
      map[`${wood} ${cfg.suffix}`] = cfg.family
    }
  }
  for (const ww of CRIMSON_WARPED_TYPES) {
    for (const cfg of crimsonWarpedPartConfigs) {
      map[`${ww} ${cfg.suffix}`] = cfg.family
    }
  }
  for (const cfg of bambooPartConfigs) {
    map[`${BAMBOO} ${cfg.suffix}`] = cfg.family
  }
  return map
}

const blockParamMap: Record<string, string> = {
  ...generateWoodMap(),

  hopper: 'hopper',
  dispenser: 'dispenser',
  dropper: 'dropper',
  observer: 'observer',
  lever: 'lever',
  comparator: 'comparator',
  repeater: 'repeater',
  'sticky piston': 'sticky_piston',
  'redstone wire': 'redstone_wire',
  'redstone torch': 'redstone_torch',
  'wall torch': 'wall_torch',
  'activator rail': 'activator_rail',
  'detector rail': 'detector_rail',
  'powered rail': 'powered_rail',

  torch: 'torch',
  piston: 'piston',
  'fence gate': 'fence_gate',
  'pressure plate': 'pressure_plate',
  trapdoor: 'trapdoor',
  stairs: 'stairs',
  slab: 'slab',
  fence: 'fence',
  door: 'door',
  button: 'button',
  rail: 'rail',

  wheat: 'crops',
  carrot: 'crops',
  carrots: 'crops',
  potato: 'crops',
  potatoes: 'crops',
  beetroot: 'beetroot',
  beetroots: 'beetroot',
  'beetroot or beetroots': 'beetroot',
  'carrot or carrots': 'crops',
  'attached melon stem': 'melon_stem',
  'attached pumpkin stem': 'stem',
  'melon stem': 'stem',
  'pumpkin stem': 'stem',
  cactus: 'cactus',
  'sugar cane': 'sugar_cane',
  kelp: 'kelp',
  'kelp plant': 'kelp',
  cocoa: 'cocoa',

  'oak sign': 'sign',
  'oak hanging sign': 'hanging_sign',
  'oak wall sign': 'sign',
  'oak wall hanging sign': 'hanging_sign',

  banner: 'banner',
  'white banner': 'banner',
  'orange banner': 'banner',
  'magenta banner': 'banner',
  'light blue banner': 'banner',
  'yellow banner': 'banner',
  'lime banner': 'banner',
  'pink banner': 'banner',
  'gray banner': 'banner',
  'light gray banner': 'banner',
  'cyan banner': 'banner',
  'purple banner': 'banner',
  'blue banner': 'banner',
  'brown banner': 'banner',
  'green banner': 'banner',
  'red banner': 'banner',
  'black banner': 'banner',
  'white wall banner': 'banner',
  'orange wall banner': 'banner',
  'magenta wall banner': 'banner',
  'light blue wall banner': 'banner',
  'yellow wall banner': 'banner',
  'lime wall banner': 'banner',
  'pink wall banner': 'banner',
  'gray wall banner': 'banner',
  'light gray wall banner': 'banner',
  'cyan wall banner': 'banner',
  'purple wall banner': 'banner',
  'blue wall banner': 'banner',
  'brown wall banner': 'banner',
  'green wall banner': 'banner',
  'red wall banner': 'banner',
  'black wall banner': 'banner',

  bed: 'bed',
  'white bed': 'bed',
  'orange bed': 'bed',
  'magenta bed': 'bed',
  'light blue bed': 'bed',
  'yellow bed': 'bed',
  'lime bed': 'bed',
  'pink bed': 'bed',
  'gray bed': 'bed',
  'light gray bed': 'bed',
  'cyan bed': 'bed',
  'purple bed': 'bed',
  'blue bed': 'bed',
  'brown bed': 'bed',
  'green bed': 'bed',
  'red bed': 'bed',
  'black bed': 'bed',

  candle: 'candle',
  'white candle': 'candle',
  'orange candle': 'candle',
  'magenta candle': 'candle',
  'light blue candle': 'candle',
  'yellow candle': 'candle',
  'lime candle': 'candle',
  'pink candle': 'candle',
  'gray candle': 'candle',
  'light gray candle': 'candle',
  'cyan candle': 'candle',
  'purple candle': 'candle',
  'blue candle': 'candle',
  'brown candle': 'candle',
  'green candle': 'candle',
  'red candle': 'candle',
  'black candle': 'candle',

  'candle cake': 'candle_cake',
  'white candle cake': 'candle_cake',
  'orange candle cake': 'candle_cake',
  'magenta candle cake': 'candle_cake',
  'light blue candle cake': 'candle_cake',
  'yellow candle cake': 'candle_cake',
  'lime candle cake': 'candle_cake',
  'pink candle cake': 'candle_cake',
  'gray candle cake': 'candle_cake',
  'light gray candle cake': 'candle_cake',
  'cyan candle cake': 'candle_cake',
  'purple candle cake': 'candle_cake',
  'blue candle cake': 'candle_cake',
  'brown candle cake': 'candle_cake',
  'green candle cake': 'candle_cake',
  'red candle cake': 'candle_cake',
  'black candle cake': 'candle_cake',

  campfire: 'campfire',
  'soul campfire': 'campfire',

  'bee nest': 'beehive',
  beehive: 'beehive',

  composter: 'composter',

  barrel: 'barrel',

  furnace: 'furnace',
  'lit furnace': 'furnace',
  blast_furnace: 'furnace',
  'lit blast furnace': 'furnace',
  smoker: 'furnace',
  'lit smoker': 'furnace',

  chest: 'chest',
  'trapped chest': 'trapped_chest',
  'ender chest': 'ender_chest',

  'white shulker box': 'shulker_box',
  'orange shulker box': 'shulker_box',
  'magenta shulker box': 'shulker_box',
  'light blue shulker box': 'shulker_box',
  'yellow shulker box': 'shulker_box',
  'lime shulker box': 'shulker_box',
  'pink shulker box': 'shulker_box',
  'gray shulker box': 'shulker_box',
  'light gray shulker box': 'shulker_box',
  'cyan shulker box': 'shulker_box',
  'purple shulker box': 'shulker_box',
  'blue shulker box': 'shulker_box',
  'brown shulker box': 'shulker_box',
  'green shulker box': 'shulker_box',
  'red shulker box': 'shulker_box',
  'black shulker box': 'shulker_box',

  cake: 'cake',

  snow: 'snow',
  'snow layer': 'snow',

  bell: 'bell',

  anvil: 'anvil',
  'chipped anvil': 'anvil',
  'damaged anvil': 'anvil',

  'brain coral': 'coral',
  'bubble coral': 'coral',
  'fire coral': 'coral',
  'horn coral': 'coral',
  'tube coral': 'coral',
  'dead brain coral': 'coral',
  'dead bubble coral': 'coral',
  'dead fire coral': 'coral',
  'dead horn coral': 'coral',
  'dead tube coral': 'coral',

  'brain coral fan': 'coral_fan',
  'bubble coral fan': 'coral_fan',
  'fire coral fan': 'coral_fan',
  'horn coral fan': 'coral_fan',
  'tube coral fan': 'coral_fan',
  'dead brain coral fan': 'coral_fan',
  'dead bubble coral fan': 'coral_fan',
  'dead fire coral fan': 'coral_fan',
  'dead horn coral fan': 'coral_fan',
  'dead tube coral fan': 'coral_fan',

  'brain coral wall fan': 'coral_wall_fan',
  'bubble coral wall fan': 'coral_wall_fan',
  'fire coral wall fan': 'coral_wall_fan',
  'horn coral wall fan': 'coral_wall_fan',
  'tube coral wall fan': 'coral_wall_fan',
  'dead brain coral wall fan': 'coral_wall_fan',
  'dead bubble coral wall fan': 'coral_wall_fan',
  'dead fire coral wall fan': 'coral_wall_fan',
  'dead horn coral wall fan': 'coral_wall_fan',
  'dead tube coral wall fan': 'coral_wall_fan',

  'sea pickle': 'sea_pickle',

  'big dripleaf': 'big_dripleaf',
  'small dripleaf': 'small_dripleaf',
  'big dripleaf stem': 'dripleaf_stem',

  'pointed dripstone': 'pointed_dripstone',

  'glow lichen': 'glow_lichen',
  'hanging roots': 'hanging_roots',
  'mossy hanging roots': 'hanging_roots',

  'cave vines': 'cave_vines',

  'nether wart': 'nether_wart',

  'chorus flower': 'chorus_flower',

  'crimson fungus': 'fungus',
  'warped fungus': 'fungus',

  'mossy cobblestone': 'mossy',
  'mossy stone bricks': 'mossy',

  'chiseled bookshelf': 'chiseled_bookshelf',

  'copper door': 'copper_door',
  'copper trapdoor': 'copper_trapdoor',
  'copper bulb': 'copper_bulb',
  'copper grate': 'copper_grate',
  'copper chest': 'copper_chest',
  'copper wall torch': 'wall_torch',
  'copper torch': 'torch',

  'exposed copper door': 'copper_door',
  'exposed copper trapdoor': 'copper_trapdoor',
  'exposed copper bulb': 'copper_bulb',
  'exposed copper grate': 'copper_grate',
  'exposed copper chest': 'copper_chest',
  'exposed copper wall torch': 'wall_torch',
  'exposed copper torch': 'torch',

  'weathered copper door': 'copper_door',
  'weathered copper trapdoor': 'copper_trapdoor',
  'weathered copper bulb': 'copper_bulb',
  'weathered copper grate': 'copper_grate',
  'weathered copper chest': 'copper_chest',
  'weathered copper wall torch': 'wall_torch',
  'weathered copper torch': 'torch',

  'oxidized copper door': 'copper_door',
  'oxidized copper trapdoor': 'copper_trapdoor',
  'oxidized copper bulb': 'copper_bulb',
  'oxidized copper grate': 'copper_grate',
  'oxidized copper chest': 'copper_chest',
  'oxidized copper wall torch': 'wall_torch',
  'oxidized copper torch': 'torch',

  'waxed copper door': 'copper_door',
  'waxed copper trapdoor': 'copper_trapdoor',
  'waxed copper bulb': 'copper_bulb',
  'waxed copper grate': 'copper_grate',
  'waxed copper chest': 'copper_chest',
  'waxed copper wall torch': 'wall_torch',
  'waxed copper torch': 'torch',

  'waxed exposed copper door': 'copper_door',
  'waxed exposed copper trapdoor': 'copper_trapdoor',
  'waxed exposed copper bulb': 'copper_bulb',
  'waxed exposed copper grate': 'copper_grate',
  'waxed exposed copper chest': 'copper_chest',
  'waxed exposed copper wall torch': 'wall_torch',
  'waxed exposed copper torch': 'torch',

  'waxed weathered copper door': 'copper_door',
  'waxed weathered copper trapdoor': 'copper_trapdoor',
  'waxed weathered copper bulb': 'copper_bulb',
  'waxed weathered copper grate': 'copper_grate',
  'waxed weathered copper chest': 'copper_chest',
  'waxed weathered copper wall torch': 'wall_torch',
  'waxed weathered copper torch': 'torch',

  'waxed oxidized copper door': 'copper_door',
  'waxed oxidized copper trapdoor': 'copper_trapdoor',
  'waxed oxidized copper bulb': 'copper_bulb',
  'waxed oxidized copper grate': 'copper_grate',
  'waxed oxidized copper chest': 'copper_chest',
  'waxed oxidized copper wall torch': 'wall_torch',
  'waxed oxidized copper torch': 'torch',

  'calibrated sculk sensor': 'calibrated_sculk_sensor',
  'sculk sensor': 'sculk_sensor',
  'sculk shrieker': 'sculk_shrieker',
  'sculk catalyzer': 'sculk_catalyzer',
  'sculk vein': 'sculk_vein',

  'decorated pot': 'decor_pot',
  'flower pot': 'flower_pot',

  'cobblestone wall': 'fence',
  'mossy cobblestone wall': 'fence',
  'andesite wall': 'fence',
  'diorite wall': 'fence',
  'granite wall': 'fence',
  'polished andesite wall': 'fence',
  'polished diorite wall': 'fence',
  'polished granite wall': 'fence',
  'stone brick wall': 'fence',
  'stone bricks wall': 'fence',
  'deepslate brick wall': 'fence',
  'deepslate tile wall': 'fence',
  'nether brick wall': 'fence',
  'red nether brick wall': 'fence',
  'end stone brick wall': 'fence',
  'prismarine wall': 'fence',
  'dark prismarine wall': 'fence',
  'tuff brick wall': 'fence',
  'mossy tuff brick wall': 'fence',

  'sea lantern': 'waterlogged_only',
  conduit: 'waterlogged_only',
  'iron bars': 'waterlogged_only',
  chain: 'waterlogged_only',
  'copper chain': 'waterlogged_only',
  'glass pane': 'waterlogged_only',

  basalt: 'log',
  'polished basalt': 'log',

  'brewing stand': 'brewing_stand',
  cauldron: 'waterlogged_only',
  'layered cauldron': 'waterlogged_only',

  'iron door': 'door',
  'iron trapdoor': 'trapdoor',

  light: 'level_block',
}

export function getBlockParams(blockName: string): BlockDataParam[] {
  const family = blockParamMap[blockName]
  if (family) return blockFamilies[family] ?? []
  return []
}

export function getBlockDisplayName(blockName: string): string {
  const key = 'TYPE_BLOCK_' + blockName.toUpperCase().replace(/ /g, '_')
  const translated = t(key)
  if (translated !== key) return translated
  return blockName
}

export function getParamDisplayName(key: string): string {
  const i18nKey = 'BLOCK_DATA_PARAM_' + key.toUpperCase()
  const translated = t(i18nKey)
  if (translated !== i18nKey) return translated
  return key
}

export function getParamValueDisplay(_paramKey: string, value: string): string {
  if (/^\d+$/.test(value)) return value
  const i18nKey = 'BLOCK_DATA_VALUE_' + value.toUpperCase()
  const translated = t(i18nKey)
  if (translated !== i18nKey) return translated
  return value
}

export function formatBlockDataState(state: BlockDataState): string {
  if (!state.blockName) return ''
  const entries = Object.entries(state.params)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}=${v}`)
  if (entries.length === 0) return state.blockName
  return `${state.blockName}[${entries.join(';')}]`
}

export function formatBlockDataStateDisplay(state: BlockDataState): string {
  if (!state.blockName) return ''
  const parts: string[] = [getBlockDisplayName(state.blockName)]
  const entries = Object.entries(state.params).filter(([, v]) => v)
  if (entries.length > 0) {
    const paramStrs = entries.map(([k, v]) => `${getParamDisplayName(k)}=${getParamValueDisplay(k, v)}`)
    parts.push(`[${paramStrs.join('; ')}]`)
  }
  return parts.join('')
}

export function parseBlockDataString(str: string): BlockDataState {
  if (!str) return { blockName: '', params: {} }
  const bracketIdx = str.indexOf('[')
  if (bracketIdx === -1) {
    return { blockName: str, params: {} }
  }
  const blockName = str.substring(0, bracketIdx)
  const paramsStr = str.substring(bracketIdx + 1, str.lastIndexOf(']'))
  const params: Record<string, string> = {}
  if (paramsStr) {
    for (const pair of paramsStr.split(';')) {
      const eqIdx = pair.indexOf('=')
      if (eqIdx !== -1) {
        const key = pair.substring(0, eqIdx).trim()
        const value = pair.substring(eqIdx + 1).trim()
        if (key) params[key] = value
      }
    }
  }
  return { blockName, params }
}
