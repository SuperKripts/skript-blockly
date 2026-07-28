import * as Blockly from 'blockly/core'
import { isSkriptEventBlock } from '../blocks/events/SkriptEventBlock'
import type { SkriptBlock } from '../blocks/SkriptBlock'

export const registrationName = 'SkriptConnectionChecker'

const OUTPUT_COMPATIBILITY: Record<string, string[]> = {
  livingentity: ['livingentity', 'entity'],
}

export class SkriptConnectionChecker extends Blockly.ConnectionChecker {
  private isCompatible(outputChecks?: string[] | null, inputChecks?: string[] | null): boolean {
    if (!outputChecks || !inputChecks) {
      return false
    }
    for (const outType of outputChecks) {
      const allowed = OUTPUT_COMPATIBILITY[outType] || [outType]
      if (inputChecks.some((inType) => allowed.includes(inType))) {
        return true
      }
    }
    return false
  }

  private getInputConnection<T extends Blockly.Connection>(a: T, b: T): T | null {
    if (a.type === Blockly.ConnectionType.INPUT_VALUE) return a
    if (b.type === Blockly.ConnectionType.INPUT_VALUE) return b
    return null
  }

  private getOutputConnection<T extends Blockly.Connection>(a: T, b: T): T | null {
    if (a.type === Blockly.ConnectionType.OUTPUT_VALUE) return a
    if (b.type === Blockly.ConnectionType.OUTPUT_VALUE) return b
    return null
  }

  doTypeChecks(a: Blockly.Connection, b: Blockly.Connection): boolean {
    const inputConn = this.getInputConnection(a, b)
    const outputConn = this.getOutputConnection(a, b)
    if (inputConn && outputConn) {
      if (this.isCompatible(outputConn.getCheck(), inputConn.getCheck())) {
        return true
      }
    }
    return super.doTypeChecks(a, b)
  }

  doDragChecks(a: Blockly.RenderedConnection, b: Blockly.RenderedConnection, distance: number): boolean {
    console.log(a.type)

    if (a.getSourceBlock().type === 'effect_cancel_event') {
      const rootBlock = b.getSourceBlock().getRootBlock()
      if (isSkriptEventBlock(rootBlock)) {
        return rootBlock.cancellable_
      }
      return false
    }

    if (a.getSourceBlock().type === 'expression_event_value') {
      const eventBlock = a.getSourceBlock() as SkriptBlock
      const rootBlock = b.getSourceBlock().getRootBlock()
      if (isSkriptEventBlock(rootBlock)) {
        return rootBlock.eventValues_.includes(eventBlock.extra_.eventValue as string)
      }
      return false
    }

    const sourceBlock = a.getSourceBlock()
    if ('supportedEvents_' in sourceBlock && Array.isArray(sourceBlock.supportedEvents_)) {
      const rootBlock = b.getSourceBlock().getRootBlock()
      if (isSkriptEventBlock(rootBlock)) {
        return sourceBlock.supportedEvents_.includes(rootBlock.type)
      }
      return false
    }

    return super.doDragChecks(a, b, distance)
  }
}

Blockly.registry.register(Blockly.registry.Type.CONNECTION_CHECKER, registrationName, SkriptConnectionChecker)

export const pluginInfo = {
  connectionChecker: registrationName,
}
