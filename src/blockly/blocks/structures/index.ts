import * as Blockly from 'blockly/core'
import { register as register_Command } from './Command.ts'
import { register as register_Example } from './Example.ts'

export const BlockInfos: Blockly.utils.toolbox.BlockInfo[] = []

function register() {
  BlockInfos.push(
    register_Command(),
    register_Example(),
  )
}

register()
