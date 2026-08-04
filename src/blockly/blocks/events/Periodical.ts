'skript syntax'

import * as Blockly from 'blockly/core'
import { type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { pte } from '@/locales/i18n'
import { FieldTimespan } from '@/blockly/inputs/FieldTimespan'
import WorldMutator, { worldList, worldName } from '../types/World'
import type { MutatorExtractValue } from '@/blockly/utils/SimpleMutator'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'
import { createSkriptEventDefinition, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_periodical'
const syntax: EventSyntax = {
  title: 'Periodical',
  docId: 2050,
  eventValues: ['event-world'],
  cancellable: false,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptEventDefinition(syntax)
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      const input = this.appendDummyInput()
      pte('EVENT_PERIODICAL_DESC', {
        0: () => input.appendField<string>(new FieldTimespan(), 'timespan'),
        1: () => input.appendField('', 'world'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
      this.setMutator(WorldMutator.createMutator(this))
    },
    updateShape_() {
      const worlds = (this.extra_.worlds as MutatorExtractValue<string>[]) ?? []
      if (worlds.length === 0) {
        this.setFieldValue('', 'world')
      } else if (worlds.length === 1) {
        this.setFieldValue(worldName(worlds[0].value), 'world')
      } else {
        this.setFieldValue('[' + worlds.map((world) => worldName(world.value)).join(', ') + ']', 'world')
      }
    },

    compose: function (this: SkriptBlock, topBlock: Blockly.Block) {
      this.extra_.worlds = WorldMutator.extractValues(topBlock)
      this.updateShape_()
    },
    decompose: function (this: SkriptBlock, workspace: Blockly.Workspace) {
      return WorldMutator.createTopBlock(workspace, (this.extra_.worlds as MutatorExtractValue<string>[]) ?? [])
    },
  }

  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    const skriptBlock = block as SkriptBlock
    const timespan = block.getFieldValue('timespan')
    const worlds = (skriptBlock.extra_.worlds as MutatorExtractValue<string>[]) ?? []
    const statementMembers = generate.statementToCode(block, 'block')
    const code = SkriptCodeGenerator.codeJoin('every', timespan, ['in', worldList(worlds)])
    return `${code}: \n${statementMembers}`
  }

  return { kind: 'block', type: blockKey }
}
