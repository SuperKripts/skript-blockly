'skript syntax'

import * as Blockly from 'blockly/core'
import { registerSimplePropertyExpression } from './ExpressionBlock'

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerSimplePropertyExpression({
    title: 'Altitude',
    docId: 940,
    blockKey: 'expression_altitude',
    desc: 'EXPRESSION_ALTITUDE_DESC',
    input: ['location'],
    output: ['number'],
    code: 'altitude',
  })
}
