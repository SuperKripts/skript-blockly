import type { SkriptType } from './Types'

export const ChatColors: SkriptType = {
  name: 'color',
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
