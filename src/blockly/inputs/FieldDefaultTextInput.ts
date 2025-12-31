import * as Blockly from 'blockly/core'
class FieldDefaultTextInput extends Blockly.FieldTextInput {
  SERIALIZABLE = true
  private readonly defVal_: string

  constructor(defVal: string, value?: string) {
    super(value)
    this.defVal_ = defVal
  }

  protected getDisplayText_(): string {
    const value = this.getValue() as string
    return value.trim() == '' ? this.defVal_ : value.trim()
  }
}

export default FieldDefaultTextInput
