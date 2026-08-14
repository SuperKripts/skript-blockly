'skript syntax'

import * as Blockly from 'blockly/core'
import { registerSimplePropertyExpression } from './ExpressionBlock'

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerSimplePropertyExpression({
    title: 'Amount',
    docId: 967,
    blockKey: 'expression_amount',
    desc: 'EXPRESSION_AMOUNT_DESC',
    input: null,
    output: ['number'],
    code: 'amount',
  })
}
