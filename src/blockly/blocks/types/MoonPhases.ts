'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const MoonPhases: SkriptType = {
  name: 'moon_phase',
  type: 'moonphase',
  options: ['first quarter', 'full moon', 'last quarter', 'new moon', 'waning crescent', 'waning gibbous', 'waxing crescent', 'waxing gibbous'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(MoonPhases, 'MoonPhases', 0)
}