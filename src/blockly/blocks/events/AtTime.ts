'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptDefinition, getSkriptHubDocUrl, type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { appendEventPriorityInput, generateCodeForEventPriority } from './EventPriority'
import { FieldTime } from '@/blockly/inputs/FieldTime'
import { pte } from '@/locales/i18n'
import WorldMutator, { worldList, worldName } from '@/blockly/blocks/types/World'
import type { MutatorExtractValue } from '@/blockly/utils/SimpleMutator'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'

const key = 'at_time'
const title = 'At Time'
const blockKey = 'event_at_time'
const docId = 0

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({ key, title, syntaxType: 'event', docUrl: getSkriptHubDocUrl(docId) })
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      const input = this.appendDummyInput()
      pte('EVENT_AT_TIME_DESC', {
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
        0: () => input.appendField('', 'world'),
        1: () => input.appendField<string>(new FieldTime(), 'time'),
      })
      appendEventPriorityInput(this)

      this.setMutator(WorldMutator.createMutator(this))
    },
    updateShape_() {
      const worlds = (this.extra_.worlds as MutatorExtractValue<string>[]) ?? []
      if (worlds.length === 0) {
        this.setFieldValue(worldName('world'), 'world')
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
    const time = block.getFieldValue('time')!
    const worlds = skriptBlock.extra_.worlds as MutatorExtractValue<string>[]
    const statementMembers = generate.statementToCode(block, 'block')
    const code = SkriptCodeGenerator.codeJoin('at', time, ['in', worldList(worlds)], generateCodeForEventPriority(block))
    return `${code}: \n${statementMembers}`
  }

  return { kind: 'block', type: blockKey }
}
