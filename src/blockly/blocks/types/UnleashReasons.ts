'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const UnleashReasons: SkriptType = {
  name: 'unleash_reason',
  type: 'unleashreason',
  options: ['distance', 'holder gone', 'leashed gone', 'player unleash', 'unknown'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(UnleashReasons, 'UnleashReasons', 0)
}