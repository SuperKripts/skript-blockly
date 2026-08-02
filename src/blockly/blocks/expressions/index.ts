import * as Blockly from 'blockly/core'
import { register as register_AbsorbedBlocks } from './AbsorbedBlocks.ts'
import { register as register_ActiveItem } from './ActiveItem.ts'
import { register as register_AffectedEntities } from './AffectedEntities.ts'
import { register as register_Age } from './Age.ts'
import { register as register_AI } from './AI.ts'
import { register as register_AllayJukebox } from './AllayJukebox.ts'
import { register as register_AllCommands } from './AllCommands.ts'
import { register as register_AlphabetList } from './AlphabetList.ts'
import { register as register_Altitude } from './Altitude.ts'
import { register as register_Amount } from './Amount.ts'
import { register as register_ARGB } from './ARGB.ts'

export const BlockInfos: Blockly.utils.toolbox.BlockInfo[] = []

function register() {
  BlockInfos.push(
    register_AbsorbedBlocks(),
    register_ActiveItem(),
    register_AffectedEntities(),
    register_Age(),
    register_AI(),
    register_AllayJukebox(),
    register_AllCommands(),
    register_AlphabetList(),
    register_Altitude(),
    register_Amount(),
    register_ARGB(),
  )
}

register()
