'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptDefinition } from '../SkriptBlock'

const name = 'at time'
const blockKey = 'event_at_time'
const docId = 0
export function register(): Blockly.utils.toolbox.BlockInfo {
  createSkriptDefinition({ id: docId, jsonId: name, title: name, syntaxType: 'event', syntaxPattern: '' })
  return {
    kind: 'block',
    type: blockKey,
  }
}
