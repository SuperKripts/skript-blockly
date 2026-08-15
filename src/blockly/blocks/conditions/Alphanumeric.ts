'skript syntax'

import * as Blockly from 'blockly/core'
import { registerModeCondition } from './ConditionBlock'

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerModeCondition({
    title: 'Alphanumeric',
    docId: 3977,
    blockKey: 'condition_alphanumeric',
    desc: 'CONDITION_ALPHANUMERIC_DESC',
    input: ['string'],
    code: 'alphanumeric',
    mode: 'be',
  })
}
