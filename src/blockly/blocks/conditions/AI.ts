'skript syntax'

import * as Blockly from 'blockly/core'
import { registerModeCondition } from './ConditionBlock'

const blockKey = 'condition_ai'

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerModeCondition({
    blockKey,
    title: 'Has AI',
    docId: 4170,
    desc: 'CONDITION_AI_DESC',
    input: ['livingentity'],
    mode: 'have',
    code: 'ai',
  })
}
