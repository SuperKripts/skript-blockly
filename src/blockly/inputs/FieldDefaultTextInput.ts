import * as Blockly from 'blockly/core'
import { t } from '@/locales/i18n'

type FieldDefaultTextInputState = {
  defKey: string
  value: string | null
}

class FieldDefaultTextInput extends Blockly.FieldTextInput {
  SERIALIZABLE = true
  private defKey_: string

  constructor(defKey: string, value?: string) {
    super(value)
    this.defKey_ = defKey
  }

  protected getDisplayText_(): string {
    const value = this.getValue() as string
    if (!value || value.trim() === '') {
      return t(this.defKey_)
    } else {
      return value
    }
  }

  saveState(): FieldDefaultTextInputState {
    return {
      defKey: this.defKey_,
      value: this.getValue(),
    }
  }

  loadState(state: FieldDefaultTextInputState): void {
    this.setValue(state.value)
    this.defKey_ = state.defKey
  }
}

export default FieldDefaultTextInput
