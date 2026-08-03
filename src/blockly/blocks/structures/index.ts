import * as Blockly from 'blockly/core'
import { register as register_Event } from './Event.ts'
import { register as register_Example } from './Example.ts'

export const BlockInfos: Blockly.utils.toolbox.BlockInfo[] = []

function register() {
  BlockInfos.push(
    register_Event(),
    register_Example(),
  )
}

register()
