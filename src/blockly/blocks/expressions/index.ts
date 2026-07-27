import * as Blockly from 'blockly/core'
import { register as register_AI } from './AI.ts'

export const BlockInfos: Blockly.utils.toolbox.BlockInfo[] = []

function register() {
  BlockInfos.push(
    register_AI(),
  )
}

register()
