'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const ChatColors: SkriptType = {
  name: 'color',
  type: 'color',
  options: [
    'black',
    'dark grey',
    'light grey',
    'white',
    'dark blue',
    'brown',
    'dark cyan',
    'light cyan',
    'dark green',
    'light green',
    'yellow',
    'orange',
    'dark red',
    'light red',
    'dark purple',
    'light purple',
  ],
}

export const ChatStyles: SkriptType = {
  name: 'chat_style',
  type: 'string',
  options: [
    'bold',
    'italic',
    'strikethrough',
    'underline',
    'magic',
    'obfuscated',
    'reset',
    'open url',
    'run command',
    'suggest command',
    'change page',
    'copy to clipboard',
    'show text',
    'font',
    'insertion',
    'translate',
    'keybind',
  ],
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(ChatColors, 'Chat', 2138)
}
