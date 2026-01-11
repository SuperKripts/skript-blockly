import * as Blockly from 'blockly/core'

type FieldDefaultTextInputState = {
  defVal: string
  value: string | null
}

class FieldDefaultTextInput extends Blockly.FieldTextInput {
  SERIALIZABLE = true
  private defVal_: string

  constructor(defVal: string, value?: string) {
    super(value)
    this.defVal_ = defVal
  }

  protected getDisplayText_(): string {
    const value = this.getValue() as string
    if (!value && value.trim() == '') {
      return this.defVal_
    } else {
      return value
    }
  }

  saveState(): FieldDefaultTextInputState {
    return {
      defVal: this.defVal_,
      value: this.getValue(),
    }
  }

  loadState(state: FieldDefaultTextInputState): void {
    this.setValue(state.value)
    this.defVal_ = state.defVal
  }
}

export default FieldDefaultTextInput
