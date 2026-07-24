'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const RespawnReasons: SkriptType = {
  name: 'respawn_reason',
  type: 'respawnreason',
  options: ['death', 'end portal', 'plugin'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(RespawnReasons, 'RespawnReasons', 0)
}