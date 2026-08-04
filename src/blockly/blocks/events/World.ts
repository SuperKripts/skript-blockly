'skript syntax'

import * as Blockly from 'blockly/core'
import { type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { pte } from '@/locales/i18n'
import WorldMutator, { worldList, worldName } from '../types/World'
import type { MutatorExtractValue } from '@/blockly/utils/SimpleMutator'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'
import { createSkriptEventDefinition, type EventSyntax } from './SkriptEventBlock'

type WorldEventInfo = {
  blockKey: string
  code: string
  syntax: EventSyntax
}

const WorldEventInfos: WorldEventInfo[] = [
  {
    blockKey: 'event_world_save',
    code: 'save',
    syntax: {
      title: 'World Save',
      docId: 1070,
      eventValues: ['event-world'],
      cancellable: false,
    },
  },
  {
    blockKey: 'event_world_init',
    code: 'init',
    syntax: {
      title: 'World Init',
      docId: 1068,
      eventValues: ['event-world'],
      cancellable: false,
    },
  },
  {
    blockKey: 'event_world_unload',
    code: 'unload',
    syntax: {
      title: 'World Unload',
      docId: 1071,
      eventValues: ['event-world'],
      cancellable: false,
    },
  },
  {
    blockKey: 'event_world_load',
    code: 'load',
    syntax: {
      title: 'World Load',
      docId: 1069,
      eventValues: ['event-world'],
      cancellable: false,
    },
  },
]

export function registerAll(): Blockly.utils.toolbox.BlockInfo[] {
  return WorldEventInfos.map((info) => {
    const definition = createSkriptEventDefinition(info.syntax)
    const mixin: Partial<SkriptBlockDefinition> = {
      initShape_(this: SkriptBlock) {
        const input = this.appendDummyInput()
        pte(info.blockKey.toUpperCase() + '_DESC', {
          0: () => input.appendField('', 'world'),
          default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
        })
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

    Blockly.Blocks[info.blockKey] = Object.assign(definition, mixin)
    CodeGenerator.forBlock[info.blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
      const skriptBlock = block as SkriptBlock
      const worlds = skriptBlock.extra_.worlds as MutatorExtractValue<string>[]
      const statementMembers = generate.statementToCode(block, 'block')
      const code = SkriptCodeGenerator.codeJoin('on world', info.code, ['of', worldList(worlds)])
      return `${code}: \n${statementMembers}`
    }
    return { kind: 'block', type: info.blockKey }
  })
}
