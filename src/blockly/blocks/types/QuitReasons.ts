'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const QuitReasons: SkriptType = {
  name: 'quit_reason',
  type: 'quitreason',
  options: ['disconnected', 'erroneous state', 'kicked', 'timed out'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(QuitReasons, 'QuitReasons', 0)
}