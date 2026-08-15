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
import type { SyntaxType } from './SkriptBlock'

if (import.meta.env.DEV) {
  console.log(Blockly.Blocks)
}

export const allBlockInfos: Record<SyntaxType, Blockly.utils.toolbox.BlockInfo[]> = {
  event: EventToolbox,
  condition: ConditionToolbox,
  effect: EffectToolbox,
  expression: ExpressionToolbox,
  type: TypeToolbox,
  function: [],
  section: SectionToolbox,
  structure: StructureToolbox,
}
