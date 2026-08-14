'skript syntax'

import * as Blockly from 'blockly/core'
import { registerSimpleExpression } from './ExpressionBlock'

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerSimpleExpression({
    title: 'Absorbed Blocks',
    docId: 4183,
    blockKey: 'expression_absorbed_blocks',
    desc: 'EXPRESSION_ABSORBED_BLOCKS_DESC',
    output: ['block'],
    code: 'absorbed blocks',
    supportedEvents: ['event_sponge_absorb'],
  })
}
