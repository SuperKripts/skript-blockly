'skript syntax'

import * as Blockly from 'blockly/core'
import 'blockly/blocks'
import { createSkriptDefinition, type SkriptBlock } from '../SkriptBlock'
import CodeGenerator, { Order, SkriptCodeGenerator } from '@/blockly/generators/skript'
import { createTempFieldDropdown, getTempLangKey } from '../types/Types'
import { t } from '@/locales/i18n'

const blockKey = 'section_conditionals'

const IfMode = ['if', 'if any', 'if all']
const ElseIfMode = ['else if', 'else if any', 'else if all']
type IfMode = (typeof IfMode)[number]
type ElseIfMode = (typeof ElseIfMode)[number]

type IfExtra = {
  if: IfMode
  elseIf: ElseIfMode[]
  else: boolean
}

function registerMutator() {
  Blockly.Blocks['section_conditionals_mutator_if'] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField(createTempFieldDropdown('section_conditionals_if_mode', IfMode), 'mode')
      this.setColour(120)
      this.setNextStatement(true)
    },
  }

  Blockly.Blocks['section_conditionals_mutator_elseif'] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField(createTempFieldDropdown('section_conditionals_elseif_mode', ElseIfMode), 'mode')
      this.setColour(120)
      this.setPreviousStatement(true)
      this.setNextStatement(true)
    },
  }

  Blockly.Blocks['section_conditionals_mutator_else'] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField(t('SECTION_CONDITIONALS_ELSE'))
      this.setColour(120)
      this.setPreviousStatement(true)
    },
  }
}
registerMutator()

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({ title: 'Conditionals', syntaxType: 'section', docUrl: 'https://skripthub.net/docs/?id=6349' })
  const mixin: Partial<SkriptBlock> = {
    initShape_() {
      this.extra_ = {
        if: 'if',
        elseIf: [],
        else: false,
      } as IfExtra
      this.setInputsInline(false)
      this.setMutator(new Blockly.icons.MutatorIcon(['section_conditionals_mutator_elseif', 'section_conditionals_mutator_else'], this))
    },
    initStyle_() {
      this.setPreviousStatement(true)
      this.setNextStatement(true)
    },
    updateShape_(this: SkriptBlock) {
      const saved: { name: string; conn: Blockly.Connection | null }[] = []
      const dynamicNames = this.inputList
        .map((input) => input.name)
        .filter((name) => name === 'if' || name === 'if_conditions' || name === 'then' || name.startsWith('elseif_') || name === 'else_stmt')
      const removeNames = new Set(dynamicNames)
      for (const name of dynamicNames) {
        if (name !== 'if' && !(name.startsWith('elseif_') && name.endsWith('_cond'))) {
          removeNames.add(name + '_label')
        }
      }
      for (const name of removeNames) {
        const input = this.getInput(name)
        if (input) {
          const conn = input.connection?.targetConnection
          if (conn) saved.push({ name, conn })
          this.removeInput(name)
        }
      }

      const ifMode = this.extra_.if as IfMode
      if (ifMode === 'if') {
        this.appendValueInput('if').appendField(t('SECTION_CONDITIONALS_IF')).setCheck('condition')
        this.appendDummyInput('then_label').appendField(t('SECTION_CONDITIONALS_THEN'))
        this.appendStatementInput('then')
      } else {
        this.appendDummyInput('if_conditions_label').appendField(t(getTempLangKey('SECTION_CONDITIONALS_IF_MODE', ifMode)))
        this.appendStatementInput('if_conditions')
        this.appendDummyInput('then_label').appendField(t('SECTION_CONDITIONALS_THEN'))
        this.appendStatementInput('then')
      }

      const elseIfModes = this.extra_.elseIf as ElseIfMode[]
      elseIfModes.forEach((elseifMode, idx) => {
        if (elseifMode === 'else if') {
          this.appendValueInput(`elseif_${idx}_cond`).appendField(t('SECTION_CONDITIONALS_ELSE_IF')).setCheck('condition')
          this.appendDummyInput(`elseif_${idx}_stmt_label`).appendField(t('SECTION_CONDITIONALS_THEN'))
          this.appendStatementInput(`elseif_${idx}_stmt`)
        } else {
          this.appendDummyInput(`elseif_${idx}_conditions_label`).appendField(t(getTempLangKey('SECTION_CONDITIONALS_ELSEIF_MODE', elseifMode)))
          this.appendStatementInput(`elseif_${idx}_conditions`)
          this.appendDummyInput(`elseif_${idx}_stmt_label`).appendField(t('SECTION_CONDITIONALS_THEN'))
          this.appendStatementInput(`elseif_${idx}_stmt`)
        }
      })

      if (this.extra_.else) {
        this.appendDummyInput('else_stmt_label').appendField(t('SECTION_CONDITIONALS_ELSE'))
        this.appendStatementInput('else_stmt')
      }

      for (const item of saved) {
        item.conn?.reconnect(this, item.name)
      }
    },
    compose(this: SkriptBlock, topBlock: Blockly.Block) {
      const ifMode = topBlock.getFieldValue('mode') as IfMode
      this.extra_.if = ifMode

      const elseIfModes: ElseIfMode[] = []
      let hasElse = false
      let currentBlock = topBlock.getNextBlock()

      while (currentBlock) {
        if (currentBlock.type === 'section_conditionals_mutator_elseif') {
          const mode = currentBlock.getFieldValue('mode') as ElseIfMode
          elseIfModes.push(mode)
        } else if (currentBlock.type === 'section_conditionals_mutator_else') {
          hasElse = true
          break
        }
        currentBlock = currentBlock.getNextBlock()
      }

      this.extra_.elseIf = elseIfModes
      this.extra_.else = hasElse

      this.updateShape_()
    },

    decompose(this: SkriptBlock, workspace: Blockly.Workspace) {
      const topBlock = workspace.newBlock('section_conditionals_mutator_if') as Blockly.BlockSvg
      topBlock.initSvg()
      topBlock.setFieldValue(this.extra_.if || 'if', 'mode')

      let prevBlock = topBlock
      const elseIfModes = this.extra_.elseIf as ElseIfMode[]

      for (const mode of elseIfModes) {
        const elseifBlock = workspace.newBlock('section_conditionals_mutator_elseif') as Blockly.BlockSvg
        elseifBlock.initSvg()
        elseifBlock.setFieldValue(mode, 'mode')
        if (prevBlock.nextConnection) {
          prevBlock.nextConnection.connect(elseifBlock.previousConnection)
        }
        prevBlock = elseifBlock
      }

      if (this.extra_.else) {
        const elseBlock = workspace.newBlock('section_conditionals_mutator_else') as Blockly.BlockSvg
        elseBlock.initSvg()
        if (prevBlock.nextConnection) {
          prevBlock.nextConnection.connect(elseBlock.previousConnection)
        }
      }

      return topBlock
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generator: SkriptCodeGenerator) => {
    const skBlock = block as SkriptBlock
    const extra = skBlock.extra_ as IfExtra
    let code = ''
    const addSection = (mode: string, condValueKey: string, condsStmtKey: string, thenKey: string) => {
      if (mode === 'if' || mode === 'else if') {
        const cond = generator.valueToCode(block, condValueKey, Order.ATOMIC)
        code += generator.codeJoin(mode, cond) + ': \n' + generator.statementToCode(block, thenKey)
      } else {
        code += `${mode}: \n${generator.statementToCode(block, condsStmtKey)}`
        code += `then: \n${generator.statementToCode(block, thenKey)}`
      }
    }

    addSection(extra.if, 'if', 'if_conditions', 'then')

    extra.elseIf.forEach((mode, idx) => {
      code += '\n'
      addSection(mode, `elseif_${idx}_cond`, `elseif_${idx}_conditions`, `elseif_${idx}_stmt`)
    })

    if (extra.else) {
      code += '\n'
      code += `else: \n${generator.statementToCode(block, 'else_stmt')}`
    }

    return code
  }
  return { kind: 'block', type: blockKey }
}
