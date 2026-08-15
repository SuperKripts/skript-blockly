'skript syntax'

import * as Blockly from 'blockly/core'
import { registerModeCondition } from './ConditionBlock'

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerModeCondition({
    title: 'Can Duplicate',
    docId: 9017,
    blockKey: 'condition_allay_can_duplicate',
    desc: 'CONDITION_ALLAY_CAN_DUPLICATE_DESC',
    input: ['livingentity'],
    code: 'duplicate',
    mode: 'can',
  })
}
