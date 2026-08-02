import * as Blockly from 'blockly/core'
import { register as register_Condition } from './Condition.ts'

export const BlockInfos: Blockly.utils.toolbox.BlockInfo[] = []

function register() {
  BlockInfos.push(
    register_Condition(),
  )
}

register()
