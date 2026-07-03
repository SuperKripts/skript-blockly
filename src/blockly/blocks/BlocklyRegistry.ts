import * as Blockly from 'blockly/core'
import { BlockInfos as EventToolbox } from '@/blockly/blocks/events'
import { TypeToolbox } from '@/blockly/blocks/types'
import { BlockInfos as StructureToolbox } from '@/blockly/blocks/structures'

console.log(Blockly.Blocks)

export const eventBlockInfos: Blockly.utils.toolbox.BlockInfo[] = EventToolbox
export const typeBlockInfos: Blockly.utils.toolbox.BlockInfo[] = TypeToolbox
export const structureBlockInfos: Blockly.utils.toolbox.BlockInfo[] = StructureToolbox
