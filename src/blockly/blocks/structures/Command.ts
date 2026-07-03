'skript syntax'

import * as Blockly from 'blockly/core'
export function register(): Blockly.utils.toolbox.BlockInfo {
  return { type: 'block', kind: 'command' }
}
