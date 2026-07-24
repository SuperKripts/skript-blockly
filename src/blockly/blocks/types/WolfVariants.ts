'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const WolfVariants: SkriptType = {
  name: 'wolf_variant',
  type: 'wolfvariant',
  options: ['ashen', 'black', 'chestnut', 'pale', 'rusty', 'snowy', 'spotted', 'striped', 'woods'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(WolfVariants, 'WolfVariants', 0)
}