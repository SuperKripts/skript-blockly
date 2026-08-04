import * as Blockly from 'blockly/core'
import { isSkriptEventBlock, type SkriptEventBlock } from '../blocks/events/SkriptEventBlock'
import type { SkriptBlock } from '../blocks/SkriptBlock'

export const registrationName = 'SkriptConnectionChecker'

const OUTPUT_COMPATIBILITY: Record<string, string[]> = {
  livingentity: ['livingentity', 'entity', 'player'],
}

export class SkriptConnectionChecker extends Blockly.ConnectionChecker {
  private isCompatible(inputChecks?: string[] | null, outputChecks?: string[] | null): boolean {
    if (!inputChecks || !outputChecks) {
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
    if (a.type === Blockly.ConnectionType.INPUT_VALUE || a.type === Blockly.ConnectionType.NEXT_STATEMENT) return a
    if (b.type === Blockly.ConnectionType.INPUT_VALUE || b.type === Blockly.ConnectionType.NEXT_STATEMENT) return b
    return null
  }

  private getOutputConnection<T extends Blockly.Connection>(a: T, b: T): T | null {
    if (a.type === Blockly.ConnectionType.OUTPUT_VALUE || a.type === Blockly.ConnectionType.PREVIOUS_STATEMENT) return a
    if (b.type === Blockly.ConnectionType.OUTPUT_VALUE || b.type === Blockly.ConnectionType.PREVIOUS_STATEMENT) return b
    return null
  }

  private getEventBlock(conn: Blockly.Connection): SkriptEventBlock | null {
    const rootBlock = conn.getSourceBlock().getRootBlock()
    if (isSkriptEventBlock(rootBlock)) {
      return rootBlock
    }
    if (rootBlock.type === 'structure_event') {
      const eventBlock = rootBlock.getInputTargetBlock('event')
      if (isSkriptEventBlock(eventBlock)) {
        return eventBlock
      }
    }
    return null
  }

  private getEnclosingInput(conn: Blockly.Connection): Blockly.Input | null {
    const input = conn.getParentInput()
    if (input) {
      return input
    }
    const prevConn = conn.getSourceBlock().previousConnection?.targetConnection
    if (prevConn) {
      return this.getEnclosingInput(prevConn)
    }
    return null
  }

  doTypeChecks(a: Blockly.Connection, b: Blockly.Connection): boolean {
    const inputConn = this.getInputConnection(a, b)
    const outputConn = this.getOutputConnection(a, b)
    if (inputConn && outputConn) {
      if (outputConn.getCheck()?.includes('event')) {
        return inputConn.getCheck()?.includes('event') ?? false
      }
      if (this.isCompatible(outputConn.getCheck(), inputConn.getCheck())) {
        return true
      }
    }
    return super.doTypeChecks(a, b)
  }

  doDragChecks(a: Blockly.RenderedConnection, b: Blockly.RenderedConnection, distance: number): boolean {
    const inputConn = this.getInputConnection(a, b)
    const outputConn = this.getOutputConnection(a, b)
    if (inputConn && outputConn) {
      const outputBlock = outputConn.getSourceBlock() as SkriptBlock

      const inputName = this.getEnclosingInput(inputConn)?.name
      if (inputName === 'if_conditions' || (inputName?.startsWith('elseif_') && inputName.endsWith('_conditions'))) {
        if (outputBlock.type !== 'condition_wrapper') {
          return false
        }
      }

      if (outputBlock.type === 'effect_cancel_event') {
        return this.getEventBlock(inputConn)?.cancellable_ ?? false
      }

      if (outputBlock.type === 'expression_event_value') {
        return this.getEventBlock(inputConn)?.eventValues_.includes(outputBlock.extra_.eventValue as string) ?? false
      }

      if ('supportedEvents_' in outputBlock && Array.isArray(outputBlock.supportedEvents_)) {
        const eventBlock = this.getEventBlock(inputConn)
        return eventBlock ? outputBlock.supportedEvents_.includes(eventBlock.type) : false
      }
    }

    return super.doDragChecks(a, b, distance)
  }
}

if (Blockly.registry.hasItem(Blockly.registry.Type.CONNECTION_CHECKER, registrationName)) {
  Blockly.registry.unregister(Blockly.registry.Type.CONNECTION_CHECKER, registrationName)
}
Blockly.registry.register(Blockly.registry.Type.CONNECTION_CHECKER, registrationName, SkriptConnectionChecker)

export const pluginInfo = {
  connectionChecker: registrationName,
}
