import * as Blockly from 'blockly/core'

import useToolbox from '@/blockly/toolbox'
import * as SkriptHubTheme from '@/blockly/themes/skripthub'

if (!Blockly.ContextMenuRegistry.registry.getItem('commentDuplicate')) {
  Blockly.ContextMenuItems.registerCommentOptions()
}

export const config = {
  // scrollbars: false,
  toolbox: useToolbox(),
  // theme,
  media: '/blockly/media',
  theme: SkriptHubTheme.skript,
  zoom: {
    controls: true,
    wheel: true,
  },
  grid: {
    spacing: 20,
    length: 22,
    snap: false,
  },
  trashcan: false,
  sounds: false,
  css: true,
  renderer: 'Thrasos',
}
