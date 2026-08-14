'skript syntax'

import * as Blockly from 'blockly/core'
import { registerSimplePropertyExpression } from './ExpressionBlock'

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerSimplePropertyExpression({
    title: 'Active Item',
    docId: 10149,
    blockKey: 'expression_active_item',
    desc: 'EXPRESSION_ACTIVE_ITEM_DESC',
    input: ['livingentity'],
    output: ['itemstack'],
    code: 'active item',
  })
}
