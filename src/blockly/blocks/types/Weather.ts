'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const Weather: SkriptType = {
  name: 'weather',
  type: 'weathertype',
  options: ['clear', 'rain', 'thunder'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(Weather, 'Weather', 0)
}