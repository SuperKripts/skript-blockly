'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptDefinition, getSkriptHubDocUrl, type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'
import { t } from '@/locales/i18n'

const blockKey = 'structure_example'

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({
    title: 'Example',
    syntaxType: 'structure',
    docUrl: getSkriptHubDocUrl(0),
  })
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      this.appendDummyInput().appendField(t('STRUCTURE_EXAMPLE_DESC'))
    },
    initStyle_() {
      this.appendStatementInput('block')
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    return `example: \n${generate.statementToCode(block, 'block')}`
  }
  return { kind: 'block', type: blockKey }
}
