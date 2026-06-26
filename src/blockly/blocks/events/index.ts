import * as Blockly from 'blockly/core'
import { register as register_AttemptAttack } from './AttemptAttack.ts'
import { register as register_AtTime } from './AtTime.ts'
import { register as register_BeaconEffect } from './BeaconEffect.ts'
import { register as register_BeaconToggle } from './BeaconToggle.ts'
import { registerAll as registerAll_SimpleEvents } from './SimpleEvents.ts'

export const BlockInfos: Blockly.utils.toolbox.BlockInfo[] = []

function register() {
  BlockInfos.push(register_AttemptAttack());
  BlockInfos.push(register_AtTime());
  BlockInfos.push(register_BeaconEffect());
  BlockInfos.push(register_BeaconToggle());
  BlockInfos.push(...registerAll_SimpleEvents());
}

register()
