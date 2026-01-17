import * as Blockly from 'blockly/core'
import { EventToolbox } from '@/blockly/blocks/events'
import { EffectToolbox } from '@/blockly/blocks/effects'
import { TypeToolbox } from '@/blockly/blocks/types'

console.log(Blockly.Blocks)

export const eventBlockInfos: Blockly.utils.toolbox.BlockInfo[] = EventToolbox
export const effectBlockInfos: Blockly.utils.toolbox.BlockInfo[] = EffectToolbox
export const typeBlockInfos: Blockly.utils.toolbox.BlockInfo[] = TypeToolbox
