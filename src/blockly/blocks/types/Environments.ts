'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const Environments: SkriptType = {
  name: 'environment',
  type: 'environment',
  options: ['normal', 'nether', 'the end', 'custom'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(Environments, 'Environments', 0)
}