import * as Blockly from 'blockly/core'
import { isSkriptEventBlock } from '../blocks/events/SkriptEventBlock'
import type { SkriptBlock } from '../blocks/SkriptBlock'

export const registrationName = 'SkriptConnectionChecker'

export class SkriptConnectionChecker extends Blockly.ConnectionChecker {
  doTypeChecks(a: Blockly.Connection, b: Blockly.Connection): boolean {
    return super.doTypeChecks(a, b)
  }

  doDragChecks(a: Blockly.RenderedConnection, b: Blockly.RenderedConnection, distance: number): boolean {
    if (a.getSourceBlock().type === 'effect_cancel_event') {
      const rootBlock = b.getSourceBlock().getRootBlock()
      if (isSkriptEventBlock(rootBlock)) {
        return rootBlock.cancellable_
      }
    }

    if (a.getSourceBlock().type === 'expression_event_value') {
      const eventBlock = a.getSourceBlock() as SkriptBlock
      const rootBlock = b.getSourceBlock().getRootBlock()
      if (isSkriptEventBlock(rootBlock)) {
        return rootBlock.eventValues_.includes(eventBlock.extra_.eventValue as string)
      }
    }

    return super.doDragChecks(a, b, distance)
  }
}

Blockly.registry.register(Blockly.registry.Type.CONNECTION_CHECKER, registrationName, SkriptConnectionChecker)

export const pluginInfo = {
  connectionChecker: registrationName,
}
