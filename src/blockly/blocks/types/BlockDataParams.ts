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
}

const exactBlocks: Record<string, string> = {
  hopper: 'hopper',
  dispenser: 'dispenser',
  dropper: 'dropper',
  observer: 'observer',
  lever: 'lever',
  comparator: 'comparator',
  repeater: 'repeater',
  'sticky piston': 'sticky_piston',
  'redstone wire': 'redstone_wire',
}

const suffixBlocks: { words: string[]; family: string }[] = [
  { words: ['fence', 'gate'], family: 'fence_gate' },
  { words: ['pressure', 'plate'], family: 'pressure_plate' },
  { words: ['wall', 'torch'], family: 'wall_torch' },
  { words: ['redstone', 'torch'], family: 'redstone_torch' },
  { words: ['activator', 'rail'], family: 'activator_rail' },
  { words: ['detector', 'rail'], family: 'detector_rail' },
  { words: ['powered', 'rail'], family: 'powered_rail' },
  { words: ['sticky', 'piston'], family: 'sticky_piston' },
  { words: ['trapdoor'], family: 'trapdoor' },
  { words: ['stairs'], family: 'stairs' },
  { words: ['slab'], family: 'slab' },
  { words: ['fence'], family: 'fence' },
  { words: ['door'], family: 'door' },
  { words: ['button'], family: 'button' },
  { words: ['torch'], family: 'torch' },
  { words: ['rail'], family: 'rail' },
  { words: ['piston'], family: 'piston' },
]

function matchSuffix(blockName: string, words: string[]): boolean {
  const parts = blockName.split(' ')
  if (parts.length < words.length) return false
  const tail = parts.slice(parts.length - words.length)
  return tail.every((w, i) => w === words[i])
}

export function getBlockParams(blockName: string): BlockDataParam[] {
  const family = exactBlocks[blockName]
  if (family) return blockFamilies[family]

  for (const { words, family: fam } of suffixBlocks) {
    if (matchSuffix(blockName, words)) return blockFamilies[fam]
  }

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
  return `${state.blockName}[${entries.join('; ')}]`
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
