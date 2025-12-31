import * as Blockly from 'blockly/core'
import CodeGenerator from '@/blockly/generators/skript'
import I18n from '@/blockly/langs/i18n'
import { useWorkspaceStore } from '@/stores/workspace'

export const key = 'skript_effect_cancel_event'

export function createCancellableContextMenu(): { text: string; enabled: boolean; callback: () => void }[] {
  const { workspace } = useWorkspaceStore()
  if (workspace) {
    return [
      {
        text: I18n.getLang('SKRIPT_MENU_OPTION', I18n.getLang('SKRIPT_EFFECT_CANCEL_EVENT')),
        enabled: true,
        callback: function () {
          const block = workspace.newBlock(key) as Blockly.BlockSvg
          block.initSvg()
        },
      },
    ]
  }
  return []
}

Blockly.Blocks[key] = {
  init: function (this: Blockly.Block) {
    this.appendDummyInput().appendField(I18n.getLang('SKRIPT_EFFECT_CANCEL_EVENT'), 'desc')
    this.setPreviousStatement(true)
    this.setStyle('effect')
  },
}

CodeGenerator.forBlock[key] = function (this: Blockly.Block) {
  return 'cancel event'
}
