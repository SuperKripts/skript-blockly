import * as Blockly from 'blockly/core'
import { BlockInfos as EventToolbox } from '@/blockly/blocks/events'
import { BlockInfos as TypeToolbox } from '@/blockly/blocks/types'
import { BlockInfos as StructureToolbox } from '@/blockly/blocks/structures'
import { BlockInfos as EffectToolbox } from '@/blockly/blocks/effects'
import { BlockInfos as ExpressionToolbox } from '@/blockly/blocks/expressions'
import { BlockInfos as ConditionToolbox } from '@/blockly/blocks/conditions'
import { BlockInfos as SectionToolbox } from '@/blockly/blocks/sections'

import '@/blockly/blocks/events/EventValues'
import '@/blockly/blocks/events/Cancellable'

if (import.meta.env.DEV) {
  console.log(Blockly.Blocks)
}

export const eventBlockInfos: Blockly.utils.toolbox.BlockInfo[] = EventToolbox
export const typeBlockInfos: Blockly.utils.toolbox.BlockInfo[] = TypeToolbox
export const structureBlockInfos: Blockly.utils.toolbox.BlockInfo[] = StructureToolbox
export const effectBlockInfos: Blockly.utils.toolbox.BlockInfo[] = EffectToolbox
export const expressionBlockInfos: Blockly.utils.toolbox.BlockInfo[] = ExpressionToolbox
export const conditionBlockInfos: Blockly.utils.toolbox.BlockInfo[] = ConditionToolbox
export const sectionBlockInfos: Blockly.utils.toolbox.BlockInfo[] = SectionToolbox
