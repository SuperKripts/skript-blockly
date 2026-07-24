'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const CatTypes: SkriptType = {
  name: 'cat_type',
  type: 'cattype',
  options: ['tabby', 'black', 'red', 'siamese', 'british shorthair', 'calico', 'persian', 'ragdoll', 'white', 'jellie', 'all black'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(CatTypes, 'Cat', 0)
}