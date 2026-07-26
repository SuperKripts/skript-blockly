import * as Blockly from 'blockly/core'
import { createApp, type App } from 'vue'
import BlockDataComponent from '@/components/blockly/BlockDataComponent.vue'
import { type BlockDataState, formatBlockDataStateDisplay } from '@/blockly/blocks/types/BlockDataParams'
import { t } from '@/locales/i18n'
import { dropdownCache } from '../blocks/types/Types'
import { BlockDatas } from '../blocks/types/Materials'

export interface FieldBlockDataConfig extends Blockly.FieldConfig {
  allowAny?: boolean
}

type FieldBlockDataFromJsonConfig = FieldBlockDataConfig & { value?: BlockDataState }

export class FieldBlockData extends Blockly.Field<BlockDataState> {
  SERIALIZABLE = true
  private vueApp_?: App
  private readonly allowAny_: boolean

  constructor(value?: BlockDataState, validator?: Blockly.FieldValidator<BlockDataState>, config?: FieldBlockDataConfig) {
    super(value ?? Blockly.Field.SKIP_SETUP, validator, config)
    this.allowAny_ = config?.allowAny ?? false
  }

  static fromJson(options: FieldBlockDataFromJsonConfig): FieldBlockData {
    return new this(options.value, undefined, options)
  }

  protected getDisplayText_(): string {
    const state = this.getValue()
    if (state) {
      return formatBlockDataStateDisplay(state)
    }
    return t('BLOCK_DATA_ANY_BLOCK')
  }

  protected showEditor_(_e?: Event): void {
    if (this.vueApp_) {
      this.vueApp_.unmount()
      this.vueApp_ = undefined
    }

    Blockly.DropDownDiv.clearContent()
    const contentDiv = Blockly.DropDownDiv.getContentDiv()

    this.vueApp_ = createApp(BlockDataComponent, {
      state: this.getValue(),
      options: dropdownCache.getOptions(BlockDatas),
      allowAny: this.allowAny_,
      onSelect: (newState: BlockDataState) => {
        this.setValue(newState)
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
    super.updateSize_((margin ?? 0) + 20)
  }
}

Blockly.fieldRegistry.register('field_block_data', FieldBlockData)
