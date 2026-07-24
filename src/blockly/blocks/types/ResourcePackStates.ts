'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const ResourcePackStates: SkriptType = {
  name: 'resource_pack_state',
  type: 'resourcepackstate',
  options: ['accepted', 'declined', 'failed download', 'successfully loaded', 'downloaded', 'invalid url', 'failed reload', 'discarded'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(ResourcePackStates, 'ResourcePackStates', 0)
}