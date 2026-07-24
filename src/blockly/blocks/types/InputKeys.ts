'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const InputKeys: SkriptType = {
  name: 'input_key',
  type: 'inputkey',
  options: ['forward', 'backward', 'left', 'right', 'jump', 'sneak', 'sprint'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(InputKeys, 'InputKeys', 0)
}