import * as Blockly from 'blockly/core'
import { register as register_AttemptAttack } from './AttemptAttack.ts'
import { register as register_AtTime } from './AtTime.ts'
import { register as register_BeaconEffect } from './BeaconEffect.ts'
import { register as register_BeaconToggle } from './BeaconToggle.ts'
import { register as register_BookEdit } from './BookEdit.ts'
import { register as register_BookSign } from './BookSign.ts'
import { register as register_Click } from './Click.ts'
import { register as register_Command } from './Command.ts'
import { register as register_Damage } from './Damage.ts'
import { registerAll as registerAll_Entity } from './Entity.ts'
import { registerAll as registerAll_EntityBlockChange } from './EntityBlockChange.ts'
import { register as register_EntityShootBow } from './EntityShootBow.ts'
import { register as register_EntityTarget } from './EntityTarget.ts'
import { registerAll as registerAll_SimpleEvents } from './SimpleEvents.ts'

export const BlockInfos: Blockly.utils.toolbox.BlockInfo[] = []

function register() {
  BlockInfos.push(
    register_AttemptAttack(),
    register_AtTime(),
    register_BeaconEffect(),
    register_BeaconToggle(),
    register_BookEdit(),
    register_BookSign(),
    register_Click(),
    register_Command(),
    register_Damage(),
    ...registerAll_Entity(),
    ...registerAll_EntityBlockChange(),
    register_EntityShootBow(),
    register_EntityTarget(),
    ...registerAll_SimpleEvents(),
  )
}

register()
