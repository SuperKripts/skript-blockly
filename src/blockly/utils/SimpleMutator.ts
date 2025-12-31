import * as Blockly from 'blockly/core'
import I18n from '@/blockly/langs/i18n'

export type MutatorExtractValue<T> = {
  id: string
  value: T
}

export type MutatorPreset<T> = {
  id: string
  desc: string
} & (
  | {
      input: true
      value?: T
    }
  | {
      input: false
      value: T
    }
)

export type SimpleMutatorConfig = {
  topBlockId: string
  topBlockDesc: string
  fieldName?: string
  multiple?: boolean
}

export class SimpleMutator<T> {
  private readonly config: Required<SimpleMutatorConfig>
  protected readonly presets: MutatorPreset<T>[] = []

  constructor(config: SimpleMutatorConfig) {
    this.config = {
      fieldName: 'value',
      multiple: true,
      ...config,
    }
    this.registerTopBlock()
  }

  private registerTopBlock() {
    const { topBlockId, topBlockDesc, multiple } = this.config
    Blockly.Blocks[topBlockId] = {
      init: function (this: Blockly.Block) {
        if (multiple) {
          this.appendDummyInput().appendField(I18n.getLang(topBlockDesc))
          this.appendStatementInput('items')
        } else {
          this.appendValueInput('items').appendField(I18n.getLang(topBlockDesc))
        }
        this.setColour(120)
      },
    }
  }

  protected registerPresetBlock(id: string, desc: string, value: T) {
    const { fieldName, multiple } = this.config
    Blockly.Blocks[id] = {
      init: function (this: Blockly.Block) {
        this.appendDummyInput().appendField(I18n.getLang(desc))
        this.appendDummyInput().appendField(String(value), fieldName).setVisible(false)
        if (multiple) {
          this.setPreviousStatement(true, null)
          this.setNextStatement(true, null)
        } else {
          this.setOutput(true)
        }
        this.setColour(120)
      },
    }
    this.presets.push({ id, desc, value, input: false })
  }

  protected registerInputPresetBlock(id: string, desc: string, field: () => Blockly.Field<T>) {
    const { fieldName, multiple } = this.config
    Blockly.Blocks[id] = {
      init: function (this: Blockly.Block) {
        this.appendDummyInput().appendField(I18n.getLang(desc)).appendField(field(), fieldName)
        if (multiple) {
          this.setPreviousStatement(true, null)
          this.setNextStatement(true, null)
        } else {
          this.setOutput(true)
        }
        this.setColour(120)
      },
    }
    this.presets.push({ id, desc, input: true })
  }

  createMutator(block: Blockly.BlockSvg): Blockly.icons.MutatorIcon {
    return new Blockly.icons.MutatorIcon(
      this.presets.map((e) => e.id),
      block,
    )
  }

  extractValues(topBlock: Blockly.Block): MutatorExtractValue<T>[] {
    const { fieldName } = this.config
    const values: MutatorExtractValue<T>[] = []
    let block = topBlock.getInputTargetBlock('items')
    while (block) {
      values.push({ id: block.type, value: block.getFieldValue(fieldName) })
      block = block.getNextBlock()
    }
    return values
  }

  createTopBlock(workspace: Blockly.Workspace, values: MutatorExtractValue<T>[]): Blockly.BlockSvg {
    const { topBlockId, fieldName, multiple } = this.config
    workspace.addChangeListener(Blockly.Events.disableOrphans)
    const topBlock = workspace.newBlock(topBlockId) as Blockly.BlockSvg
    topBlock.initSvg()
    let connection = topBlock.getInput('items')!.connection!

    for (const value of values) {
      const block = workspace.newBlock(value.id) as Blockly.BlockSvg
      block.initSvg()

      if (value.value && this.presets.find((e) => e.id === value.id)?.input) {
        block.setFieldValue(value.value, fieldName)
      }

      if (multiple) {
        connection.connect(block.previousConnection)
        connection = block.nextConnection!
      } else {
        connection.connect(block.outputConnection)
      }
    }

    return topBlock
  }
}
