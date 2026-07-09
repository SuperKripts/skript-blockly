import * as Blockly from 'blockly/core'
import { register as register_ApplyBoneMeal } from './ApplyBoneMeal.ts'
import { register as register_Delay } from './Delay.ts'

export const BlockInfos: Blockly.utils.toolbox.BlockInfo[] = []

function register() {
  BlockInfos.push(
    register_ApplyBoneMeal(),
    register_Delay(),
  )
}

register()
