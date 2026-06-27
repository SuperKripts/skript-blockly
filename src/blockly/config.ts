import * as Blockly from 'blockly/core'

import useToolbox from '@/blockly/toolbox'
import * as SkriptHubTheme from '@/blockly/themes/skripthub'
import { useWorkspaceStore } from '@/stores/workspace'

if (!Blockly.ContextMenuRegistry.registry.getItem('commentDuplicate')) {
  Blockly.ContextMenuItems.registerCommentOptions()
}

const ctrlS = Blockly.ShortcutRegistry.registry.createSerializedKey(Blockly.utils.KeyCodes.S, [Blockly.utils.KeyCodes.CTRL])
const metaS = Blockly.ShortcutRegistry.registry.createSerializedKey(Blockly.utils.KeyCodes.S, [Blockly.utils.KeyCodes.META])

Blockly.ShortcutRegistry.registry.unregister('SaveToBrowser')
Blockly.ShortcutRegistry.registry.register(
  {
    name: 'SaveToBrowser',
    keyCodes: [ctrlS, metaS],
    callback(workspace: Blockly.WorkspaceSvg, e: Event, shortcut: Blockly.ShortcutRegistry.KeyboardShortcut, scope: Blockly.ContextMenuRegistry.Scope) {
      e.preventDefault()
      e.stopPropagation()

      const { saveWorkspaceToBrowser } = useWorkspaceStore()
      saveWorkspaceToBrowser()
      return true
    },
  },
  false,
)

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
