import { t } from '@/locales/i18n'
import * as Blockly from 'blockly/core'
import CodeGenerator from '@/blockly/generators/skript'
import { type SkriptEventBlock } from '@/blockly/blocks/events/EventBlock'

const event_cancelable = 'event_cancelable'

export const EVENT_VALUE_BLOCK_TYPE = 'effect_cancel_event'

if (!Blockly.ContextMenuRegistry.registry.getItem(event_cancelable)) {
  Blockly.ContextMenuRegistry.registry.register({
    id: event_cancelable,
    scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
    weight: 50,
    callback: (scope: Blockly.ContextMenuRegistry.Scope) => {
      const block = scope.block
      if (block) {
        if (block.workspace.isFlyout) {
          const newBlock = block.workspace.targetWorkspace?.newBlock(EVENT_VALUE_BLOCK_TYPE)
          newBlock?.initSvg()
        } else {
          const newBlock = block.workspace.newBlock(EVENT_VALUE_BLOCK_TYPE)
          newBlock.initSvg()
        }
      }
    },
    displayText: () => {
      return t('MENU_OPTION_GET', [t('EFFECT_CANCEL_EVENT')])
    },
    preconditionFn: (scope: Blockly.ContextMenuRegistry.Scope) => {
      if (scope.block?.getStyleName() === 'event') {
        const eventBlock = scope.block as SkriptEventBlock
        if (eventBlock.eventCancellable_) {
          return 'enabled'
        }
      }
      return 'hidden'
    },
  })
}

Blockly.Blocks[EVENT_VALUE_BLOCK_TYPE] = {
  init: function (this: Blockly.Block) {
    this.appendDummyInput().appendField(t('EFFECT_CANCEL_EVENT'), 'desc')
    this.setPreviousStatement(true)
    this.setStyle('effect')
  },
}

CodeGenerator.forBlock[EVENT_VALUE_BLOCK_TYPE] = function (this: Blockly.Block) {
  return 'cancel event'
}
