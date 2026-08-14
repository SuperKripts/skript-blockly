'skript syntax'

import * as Blockly from 'blockly/core'
import { registerSimplePropertyExpression } from './ExpressionBlock'

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerSimplePropertyExpression({
    title: 'Allay Target Jukebox',
    docId: 13367,
    blockKey: 'expression_allay_jukebox',
    desc: 'EXPRESSION_ALLAY_JUKEBOX_DESC',
    input: ['livingentity'],
    output: ['location'],
    code: 'target jukebox',
  })
}
