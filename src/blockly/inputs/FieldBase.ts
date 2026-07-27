import * as Blockly from 'blockly/core'
import { createApp, type App, type Component } from 'vue'

export abstract class FieldBase<T> extends Blockly.Field<T> {
  SERIALIZABLE = true
  protected vueApp_?: App

  constructor(value?: T | null, validator?: Blockly.FieldValidator<T> | null, config?: Blockly.FieldConfig) {
    super(value ?? Blockly.Field.SKIP_SETUP, validator, config)
  }

  protected abstract vueComponent_(): Component

  protected abstract vueProps(): Record<string, unknown>

  protected createApp_(): App {
    return createApp(this.vueComponent_(), {
      ...this.vueProps(),
      onResize: () => {
        requestAnimationFrame(() => {
          Blockly.DropDownDiv.repositionForWindowResize()
        })
      },
      onSelect: (value: string) => {
        this.setValue(value)
        requestAnimationFrame(() => {
          Blockly.DropDownDiv.repositionForWindowResize()
        })
      },
      onClose: () => {
        Blockly.DropDownDiv.hideIfOwner(this)
      },
      onSelectAndClose: (value: string) => {
        this.setValue(value)
        Blockly.DropDownDiv.hideIfOwner(this)
      },
    })
  }

  protected showEditor_() {
    Blockly.DropDownDiv.clearContent()
    const contentDiv = Blockly.DropDownDiv.getContentDiv()

    this.vueApp_ = this.createApp_()
    this.vueApp_.mount(contentDiv)

    const sourceBlock = this.getSourceBlock()
    if (sourceBlock instanceof Blockly.BlockSvg) {
      const bg = sourceBlock.getColour()
      const border = sourceBlock.getColourTertiary()
      Blockly.DropDownDiv.setColour(bg, border)
    }

    Blockly.DropDownDiv.showPositionedByField(this, () => {
      this.disposeEditor_()
    })
  }

  protected disposeEditor_() {
    if (this.vueApp_) {
      this.vueApp_.unmount()
      this.vueApp_ = undefined
    }
  }

  public override dispose(): void {
    this.disposeEditor_()
    super.dispose()
  }
}
