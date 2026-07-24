'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const ZombieNautilusVariants: SkriptType = {
  name: 'zombie_nautilus_variant',
  type: 'zombienautilusvariant',
  options: ['temperate', 'warm'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(ZombieNautilusVariants, 'ZombieNautilusVariants', 0)
}