'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const GameModes: SkriptType = {
  name: 'game_mode',
  type: 'gamemode',
  options: ['survival', 'creative', 'adventure', 'spectator'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(GameModes, 'GameModes', 0)
}