'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const SoundCategories: SkriptType = {
  name: 'sound_category',
  type: 'soundcategory',
  options: ['ambient', 'blocks', 'hostile', 'master', 'music', 'neutral', 'players', 'records', 'voice', 'weather', 'ui'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(SoundCategories, 'SoundCategories', 0)
}