import * as Blockly from 'blockly/core'

export type FieldTimeConfig = Blockly.FieldTextInputConfig
export type FieldTimeInputValidator = Blockly.FieldTextInputValidator
export interface FieldTimeFromJsonConfig extends FieldTimeConfig {
  time?: string
}

export class FieldTime extends Blockly.FieldTextInput {
  constructor(value?: string) {
    super(value)
    this.SERIALIZABLE = true
  }

  static fromJson(options: FieldTimeFromJsonConfig): FieldTime {
    const { time } = options
    return new this(time)
  }

  protected doClassValidation_(newValue?: string): string | null {
    if (!newValue) return null

    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
    if (!timeRegex.test(newValue)) return null

    return newValue
  }

  protected getText_(): string | null {
    const value = this.getValue()
    if (!value) return null
    return value
  }

  protected showEditor_(e?: Event) {
    super.showEditor_(e, true)
    this.htmlInput_?.focus({ preventScroll: true })
    this.htmlInput_?.select()
    this.showDropdown()
  }

  protected updateSize_(margin?: number) {
    super.updateSize_((margin ?? 0) + 20)
  }

  private showDropdown(): void {
    if (!this.htmlInput_) return
    Blockly.utils.dom.addClass(this.htmlInput_, 'blocklyTimeInput')

    globalThis.requestAnimationFrame(() => {
      if (this.htmlInput_?.showPicker) {
        this.htmlInput_.showPicker()
      }
    })
  }

  protected widgetCreate_(): HTMLInputElement {
    const htmlInput = super.widgetCreate_() as HTMLInputElement
    htmlInput.type = 'time'
    return htmlInput
  }
}

FieldTime.prototype.DEFAULT_VALUE = new Date().toLocaleTimeString('en-GB', {
  hour12: false,
  hour: '2-digit',
  minute: '2-digit',
})

Blockly.fieldRegistry.register('field_time', FieldTime)
