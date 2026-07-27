import * as Blockly from 'blockly/core'
import { type Component } from 'vue'
import TimespanPickerComponent from '@/components/blockly/TimespanPickerComponent.vue'
import { FieldBase } from './FieldBase'

export interface FieldTimespanConfig extends Blockly.FieldConfig {
  showForever?: boolean
}

type FieldTimespanFromJsonConfig = FieldTimespanConfig & {
  timespan?: string
}

export class FieldTimespan extends FieldBase<string> {
  private readonly showForever_: boolean

  constructor(value?: string, validator?: Blockly.FieldValidator<string>, config?: FieldTimespanConfig) {
    super(value, validator, config)
    this.showForever_ = config?.showForever ?? false
  }

  static fromJson(options: FieldTimespanFromJsonConfig): FieldTimespan {
    return new this(options.timespan, undefined, options)
  }

  protected vueComponent_(): Component {
    return TimespanPickerComponent
  }

  protected vueProps(): Record<string, unknown> {
    return { value: this.getValue(), showForever: this.showForever_ }
  }
}

FieldTimespan.prototype.DEFAULT_VALUE = 'a second'
Blockly.fieldRegistry.register('field_timespan', FieldTimespan)
