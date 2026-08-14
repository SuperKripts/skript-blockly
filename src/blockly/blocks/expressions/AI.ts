'skript syntax'

import * as Blockly from 'blockly/core'
import { registerSimplePropertyExpression } from './ExpressionBlock'

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerSimplePropertyExpression({
    title: 'AI',
    docId: 4186,
    blockKey: 'expression_ai',
    desc: 'EXPRESSION_AI_DESC',
    input: ['livingentity'],
    output: ['boolean'],
    code: 'ai',
  })
}
