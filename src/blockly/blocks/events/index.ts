import * as Blockly from 'blockly/core'
import { registerAll as registerAll_SimpleEvents } from './SimpleEvents.ts'

export const BlockInfos: Blockly.utils.toolbox.BlockInfo[] = []

function register() {
  BlockInfos.push(...registerAll_SimpleEvents());
}

register()
