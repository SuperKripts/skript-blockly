'skript syntax'

import { createSkriptDefinition, getSkriptHubDocUrl, type SkriptBlockDefinition } from '../SkriptBlock'
import * as Blockly from 'blockly/core'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'

function registerNumberType(blockKey: string, title: string, fieldName: string, defaultValue: number = 0): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({
    title,
    syntaxType: 'type',
    docUrl: getSkriptHubDocUrl(2157),
  })
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_() {
      this.appendDummyInput().appendField(new Blockly.FieldNumber(defaultValue), fieldName)
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, _generate: SkriptCodeGenerator) => {
    return [String(block.getFieldValue(fieldName)), 0]
  }
  return { kind: 'block', type: blockKey }
}

function registerStringType(blockKey: string, title: string, fieldName: string, defaultValue: string = ''): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({
    title,
    syntaxType: 'type',
    docUrl: getSkriptHubDocUrl(2164),
  })
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_() {
      this.appendDummyInput().appendField(new Blockly.FieldTextInput(defaultValue), fieldName)
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, _generate: SkriptCodeGenerator) => {
    return [`"${block.getFieldValue(fieldName)}"`, 0]
  }
  return { kind: 'block', type: blockKey }
}

function registerBooleanType(blockKey: string, title: string, fieldName: string): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({
    title,
    syntaxType: 'type',
    docUrl: getSkriptHubDocUrl(2135),
  })
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_() {
      this.appendDummyInput().appendField(
        new Blockly.FieldDropdown([
          ['true', 'true'],
          ['false', 'false'],
        ]),
        fieldName,
      )
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, _generate: SkriptCodeGenerator) => {
    return [block.getFieldValue(fieldName), 0]
  }
  return { kind: 'block', type: blockKey }
}

export function registerAll(): Blockly.utils.toolbox.BlockInfo[] {
  return [
    registerNumberType('type_number', 'Number', 'number', 0),
    // registerNumberType('type_integer', 'Integer', 'integer', 0),
    // registerNumberType('type_long', 'Long', 'long', 0),
    // registerNumberType('type_short', 'Short', 'short', 0),
    // registerNumberType('type_byte', 'Byte', 'byte', 0),
    // registerNumberType('type_double', 'Double', 'double', 0),
    // registerNumberType('type_float', 'Float', 'float', 0),
    registerStringType('type_string', 'String', 'string', ''),
    registerBooleanType('type_boolean', 'Boolean', 'boolean'),
  ]
}
