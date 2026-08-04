import * as Blockly from 'blockly/core'
import { register as register_Conditionals } from './Conditionals.ts'

export const BlockInfos: Blockly.utils.toolbox.BlockInfo[] = []

function register() {
  BlockInfos.push(
    register_Conditionals(),
  )
}

register()
