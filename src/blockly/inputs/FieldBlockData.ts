import * as Blockly from 'blockly/core'
import { type Component } from 'vue'
import BlockDataComponent from '@/components/blockly/BlockDataComponent.vue'
import { type BlockDataState, formatBlockDataStateDisplay, formatBlockDataState } from '@/blockly/blocks/types/BlockDataParams'
import { t } from '@/locales/i18n'
import { dropdownCache } from '../blocks/types/Types'
import { BlockDatas } from '../blocks/types/Materials'
import { FieldBase } from './FieldBase'

export interface FieldBlockDataConfig extends Blockly.FieldConfig {
  withEmpty?: boolean
}

type FieldBlockDataFromJsonConfig = FieldBlockDataConfig & { value?: BlockDataState }

export class FieldBlockData extends FieldBase<BlockDataState> {
  private readonly withEmpty_: boolean

  constructor(value?: BlockDataState | null, config?: FieldBlockDataConfig) {
    super(value, null, config)
    this.withEmpty_ = config?.withEmpty ?? false
  }

  static fromJson(options: FieldBlockDataFromJsonConfig): FieldBlockData {
    return new this(options.value, options)
  }

  protected vueComponent_(): Component {
    return BlockDataComponent
  }

  protected vueProps(): Record<string, unknown> {
    return {
      state: this.getValue(),
      options: dropdownCache.getOptions(BlockDatas),
      withEmpty: this.withEmpty_,
    }
  }

  protected getDisplayText_(): string {
    const state = this.getValue()
    if (state && state.blockName !== '') {
      return formatBlockDataStateDisplay(state)
    }
    return t('BLOCK_DATA_ANY_BLOCK')
  }

  getText(): string {
    const state = this.getValue()
    return state ? formatBlockDataState(state) : ''
  }
}

Blockly.fieldRegistry.register('field_block_data', FieldBlockData)
