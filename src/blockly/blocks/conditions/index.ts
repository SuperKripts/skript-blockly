import * as Blockly from 'blockly/core'
import { register as register_AI } from './AI.ts'
import { register as register_AllayCanDuplicate } from './AllayCanDuplicate.ts'
import { register as register_Alphanumeric } from './Alphanumeric.ts'
import { register as register_Condition } from './Condition.ts'

export const BlockInfos: Blockly.utils.toolbox.BlockInfo[] = []

function register() {
  BlockInfos.push(
    register_AI(),
    register_AllayCanDuplicate(),
    register_Alphanumeric(),
    register_Condition(),
  )
}

register()
