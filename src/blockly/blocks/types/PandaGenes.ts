'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const PandaGenes: SkriptType = {
  name: 'panda_gene',
  type: 'gene',
  options: ['normal', 'lazy', 'worried', 'playful', 'brown', 'weak', 'aggressive'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(PandaGenes, 'PandaGenes', 3748)
}