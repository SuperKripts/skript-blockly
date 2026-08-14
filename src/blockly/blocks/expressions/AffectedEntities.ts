'skript syntax'

import * as Blockly from 'blockly/core'
import { registerSimpleExpression } from './ExpressionBlock'

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerSimpleExpression({
    title: 'Affected Entities',
    docId: 3734,
    blockKey: 'expression_affected_entities',
    desc: 'EXPRESSION_AFFECTED_ENTITIES_DESC',
    output: ['livingentity'],
    code: 'affected entities',
    supportedEvents: ['event_aoe_cloud_effect'],
  })
}
