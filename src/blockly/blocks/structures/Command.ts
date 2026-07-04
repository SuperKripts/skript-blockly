'skript syntax'

import * as Blockly from 'blockly/core'

const blockKey = 'structure_command'

function register(): Blockly.utils.toolbox.BlockInfo {
  return { kind: 'block', type: blockKey }
}
