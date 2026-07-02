import * as Blockly from 'blockly/core'
import { createApp, type App } from 'vue'
import TimespanPickerComponent from '@/components/blockly/TimespanPickerComponent.vue'

export interface FieldTimespanConfig extends Blockly.FieldConfig {
  timespan?: string
  showForever?: boolean
}

type FieldTimespanFromJsonConfig = FieldTimespanConfig

export class FieldTimespan extends Blockly.Field {
  private vueApp_?: App
  private readonly showForever_: boolean

  constructor(value?: string, validator?: Blockly.FieldValidator<string>, config?: FieldTimespanConfig) {
    super(value, validator, config)
    this.SERIALIZABLE = true
    this.showForever_ = config?.showForever ?? false
  }

  static fromJson(options: FieldTimespanFromJsonConfig): FieldTimespan {
    const timespan = options.timespan
    return new this(timespan, undefined, options)
  }

  protected doClassValidation_(newValue?: string): string | null {
    if (!newValue) return null
    return String(newValue)
  }

  protected getText_(): string | null {
    const val = this.getValue()
    return val ? String(val) : null
  }

  protected showEditor_(_e?: Event): void {
    if (this.vueApp_) {
      this.vueApp_.unmount()
      this.vueApp_ = undefined
    }

    Blockly.DropDownDiv.clearContent()
    const contentDiv = Blockly.DropDownDiv.getContentDiv()

    this.vueApp_ = createApp(TimespanPickerComponent, {
      value: this.getValue(),
      showForever: this.showForever_, // 传递配置
      onSelect: (value: string) => {
        this.setValue(value)
      },
      onClose: () => {
        Blockly.DropDownDiv.hideIfOwner(this)
      },
    })
    this.vueApp_.mount(contentDiv)

    const sourceBlock = this.getSourceBlock()
    if (sourceBlock instanceof Blockly.BlockSvg) {
      const bg = sourceBlock.getColour()
      const border = sourceBlock.getColourTertiary()
      Blockly.DropDownDiv.setColour(bg, border)
    }

    Blockly.DropDownDiv.showPositionedByField(this, () => {
      this.dropdownDispose_()
    })
  }

  private dropdownDispose_(): void {
    if (this.vueApp_) {
      this.vueApp_.unmount()
      this.vueApp_ = undefined
    }
  }

  dispose(): void {
    this.dropdownDispose_()
    super.dispose()
  }

  protected updateSize_(margin?: number): void {
    super.updateSize_((margin ?? 0) + 10)
  }
}

FieldTimespan.prototype.DEFAULT_VALUE = 'a second'
Blockly.fieldRegistry.register('field_timespan', FieldTimespan)
