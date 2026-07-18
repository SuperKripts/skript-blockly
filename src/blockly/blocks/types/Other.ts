'skript syntax'

import { createSkriptDefinition, getSkriptHubDocUrl, type SkriptBlockDefinition } from '../SkriptBlock'
import { BlockDatas, ItemTypes } from './Materials'
import { Entities } from './Entities'
import { createFieldSearchDropdown, type SkriptTypes } from './Types'
import * as Blockly from 'blockly/core'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'

export const EntitiesItemBlock: SkriptTypes = {
  name: 'entities_item_block',
  types: [Entities, ItemTypes, BlockDatas],
}

function registerBlockType(): Blockly.utils.toolbox.BlockInfo {
  const blockKey = 'type_block'
  const definition = createSkriptDefinition({
    title: 'Block',
    syntaxType: 'type',
    docUrl: getSkriptHubDocUrl(2134),
  })
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_() {
      this.appendDummyInput().appendField(createFieldSearchDropdown(BlockDatas), 'block')
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, _generate: SkriptCodeGenerator) => {
    return [block.getFieldValue('block'), 0]
  }
  return { kind: 'block', type: blockKey }
}

export function registerAll(): Blockly.utils.toolbox.BlockInfo[] {
  return [registerBlockType()]
}
