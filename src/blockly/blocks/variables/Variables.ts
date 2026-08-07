import * as Blockly from 'blockly/core'
import { createSkriptDefinition, type SkriptBlock } from '../SkriptBlock'
import CodeGenerator, { Order, SkriptCodeGenerator } from '@/blockly/generators/skript'

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({
    title: 'Variable',
    syntaxType: 'expression',
    docUrl: 'https://www.skriptlang.org/variables',
  })
  const mixin: Partial<SkriptBlock> = {
    initShape_() {
      this.appendDummyInput().appendField(new Blockly.FieldLabel(), 'category').appendField(new Blockly.FieldVariable(null), 'VAR')
      this.mixin({
        onchange: (e: Blockly.Events.Abstract) => {
          if (!e.isUiEvent) {
            this.updateShape_()
          }
        },
      })
    },
    initStyle_() {
      this.setOutput(true)
    },
    updateShape_() {
      const varId = this.getFieldValue('VAR')
      if (!varId) {
        return
      }

      const variable = this.workspace.getVariableMap().getVariableById(varId)
      if (variable) {
        const varName = variable.getName()
        if (varName?.startsWith('_')) {
          this.setFieldValue('局部变量', 'category')
        } else if (varName?.startsWith('-')) {
          this.setFieldValue('临时变量', 'category')
        } else {
          this.setFieldValue('全局变量', 'category')
        }
      }
    },
  }
  Blockly.Blocks['variables_get'] = Object.assign(definition, mixin)
  CodeGenerator.forBlock['variables_get'] = (block: Blockly.Block, _generator: SkriptCodeGenerator) => {
    const varId = block.getFieldValue('VAR')
    if (varId) {
      const variable = block.workspace.getVariableMap().getVariableById(varId)
      if (variable) {
        const varName = variable.getName()
        return [`{${varName}}`, Order.ATOMIC]
      }
    }
    return null
  }

  return {
    kind: 'block',
    type: 'variables_get',
  }
}
