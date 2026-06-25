import * as Blockly from 'blockly/core'
import { register as register_AtTimes } from './AtTimes.ts'
import { registerAll as registerAll_SimpleEvents } from './SimpleEvents.ts'

export const BlockInfos: Blockly.utils.toolbox.BlockInfo[] = []

function register() {
  BlockInfos.push(register_AtTimes());
  BlockInfos.push(...registerAll_SimpleEvents());
}

register()
