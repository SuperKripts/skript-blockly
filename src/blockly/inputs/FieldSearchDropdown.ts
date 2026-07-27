import * as Blockly from 'blockly/core'
import SearchDropdownCache from '../utils/FieldSearchCache'
import { createApp, type App } from 'vue'
import SearchDropdownComponent from '@/components/blockly/SearchDropdownComponent.vue'

export interface FieldSearchDropdownConfig extends Blockly.FieldDropdownConfig {
  cacheKey?: string
}

export interface FieldSearchDropdownFromJsonConfig extends FieldSearchDropdownConfig {
  options?: Blockly.MenuGenerator
}

type FieldSearchDropdownValidator = Blockly.FieldDropdownValidator

export class FieldSearchDropdown extends Blockly.FieldDropdown {
  private readonly cacheKey?: string

  private vueApp_?: App

  constructor(menuGenerator: Blockly.MenuGenerator, validator?: FieldSearchDropdownValidator, config?: FieldSearchDropdownConfig) {
    super(menuGenerator, validator, config)
    this.cacheKey = config?.cacheKey
  }

  static fromJson(config: FieldSearchDropdownFromJsonConfig) {
    if (!config.options) {
      throw new Error('options are required for the dropdown field. The ' + 'options property must be assigned an array of ' + '[humanReadableValue, languageNeutralValue] tuples.')
    }
    return new this(config.options, undefined, config)
  }

  protected showEditor_() {
    Blockly.DropDownDiv.clearContent()
    const contentDiv = Blockly.DropDownDiv.getContentDiv()
    const { options, fuse } = SearchDropdownCache.getOrBuild(this.getOptions(false), this.cacheKey)

    this.vueApp_ = createApp(SearchDropdownComponent, {
      options,
      searcher: fuse,
      currentValue: this.getValue(),
      onSelect: (value: string) => {
        this.setValue(value)
        Blockly.DropDownDiv.hideIfOwner(this)
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

    Blockly.DropDownDiv.showPositionedByField(this, this.dropdownDispose_.bind(this))
  }

  protected override dropdownDispose_(): void {
    if (this.vueApp_) {
      this.vueApp_.unmount()
      this.vueApp_ = undefined
    }
    super.dropdownDispose_()
  }
}

Blockly.fieldRegistry.register('field_search_dropdown', FieldSearchDropdown)
