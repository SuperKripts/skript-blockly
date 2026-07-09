import * as Blockly from 'blockly/core'
import { registerAll as registerAll_BasicTypes } from './BasicTypes.ts'
import { registerAll as registerAll_Other } from './Other.ts'
import { register as register_Timespan } from './Timespan.ts'

export const BlockInfos: Blockly.utils.toolbox.BlockInfo[] = []

function register() {
  BlockInfos.push(
    ...registerAll_BasicTypes(),
    ...registerAll_Other(),
    register_Timespan(),
  )
}

register()
