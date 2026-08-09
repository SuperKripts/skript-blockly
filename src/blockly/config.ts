import * as Blockly from 'blockly/core'

import useToolbox from '@/blockly/toolbox'
import * as SkriptHubTheme from '@/blockly/themes/skripthub'
import { useWorkspaceStore } from '@/stores/workspace'
import { useDialogStore } from '@/stores/dialog'
import { pluginInfo as connectionCheckerPluginInfo } from '@/blockly/utils/SkriptConnectionChecker'

Blockly.dialog.setAlert((message, optCallback) => {
  const promise = useDialogStore().$alert(message)
  if (optCallback) {
    promise.then(optCallback)
  }
})
Blockly.dialog.setConfirm((message, callback) => {
  useDialogStore().$confirm(message).then(callback)
})
Blockly.dialog.setPrompt((message, defaultValue, callback) => {
  useDialogStore().$prompt(message, defaultValue).then(callback)
})

if (!Blockly.ContextMenuRegistry.registry.getItem('commentDuplicate')) {
  Blockly.ContextMenuItems.registerCommentOptions()
}

const ctrlS = Blockly.ShortcutRegistry.registry.createSerializedKey(Blockly.utils.KeyCodes.S, [Blockly.utils.KeyCodes.CTRL])
const metaS = Blockly.ShortcutRegistry.registry.createSerializedKey(Blockly.utils.KeyCodes.S, [Blockly.utils.KeyCodes.META])

if (Blockly.ShortcutRegistry.registry.getKeyCodesByShortcutName('SaveToBrowser').length > 0) {
  Blockly.ShortcutRegistry.registry.unregister('SaveToBrowser')
}

Blockly.ShortcutRegistry.registry.register(
  {
    name: 'SaveToBrowser',
    keyCodes: [ctrlS, metaS],
    callback(workspace: Blockly.WorkspaceSvg, e: Event, _shortcut: Blockly.ShortcutRegistry.KeyboardShortcut, _scope: Blockly.ContextMenuRegistry.Scope) {
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
  plugins: {
    ...connectionCheckerPluginInfo,
  },
}

export function injectBlockly(element: Element): Blockly.WorkspaceSvg {
  const workspace = Blockly.inject(element, config)
  workspace.addChangeListener(disableOrphans)
  return workspace
}

function disableOrphans(e: Blockly.Events.Abstract) {
  if ('blockId' in e && e.blockId) {
    const block = e.getEventWorkspace_().getBlockById(e.blockId as string)
    if (block?.getStyleName() !== 'event') {
      Blockly.Events.disableOrphans(e)
    }
  }
}
