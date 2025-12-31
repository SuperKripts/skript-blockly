import Fuse from 'fuse.js'
import * as Blockly from 'blockly/core'

export type BlockData = {
  type: string
  inputs: string[]
  blockInfo: Blockly.utils.toolbox.BlockInfo
}

export class BlockSearcher {
  private readonly fuse: Fuse<BlockData>

  constructor(blockInfos: Blockly.utils.toolbox.BlockInfo[]) {
    const dataList: BlockData[] = []
    const tempWorkspace = new Blockly.Workspace()
    for (const blockInfo of blockInfos) {
      const type = blockInfo.type
      if (type) {
        const block = tempWorkspace.newBlock(type)
        const inputs: string[] = []
        for (const input of block.inputList) {
          for (const field of input.fieldRow) {
            inputs.push(field.getText())
          }
        }
        dataList.push({ type, inputs, blockInfo })
      }
    }

    this.fuse = new Fuse(dataList, {
      keys: ['type', 'inputs'],
      threshold: 0.3,
      minMatchCharLength: 1,
      ignoreLocation: true,
      shouldSort: true,
    })
  }

  search(query: string): Blockly.utils.toolbox.BlockInfo[] {
    if (!query.trim()) {
      return []
    }

    return this.fuse.search(query).map((e) => e.item.blockInfo)
  }
}

export class SearchToolboxCategory extends Blockly.ToolboxCategory {
  public static readonly SEARCH_CATEGORY_KIND = 'search'
  public static readonly SEARCH_SHORTCUT = 'shortcut-search'
  public static readonly SEARCH_INPUT_ID = 'toolbox-search-input'

  private readonly _searchInput: HTMLInputElement
  private _searcher?: BlockSearcher

  constructor(categoryDef: Blockly.utils.toolbox.StaticCategoryInfo, parentToolbox: Blockly.IToolbox, opt_parent?: Blockly.ICollapsibleToolboxItem) {
    super(categoryDef, parentToolbox, opt_parent)

    this._searchInput = document.createElement('input')
    this._searchInput.id = SearchToolboxCategory.SEARCH_INPUT_ID
    this._searchInput.type = 'search'
  }

  override init(): void {
    super.init()

    const seen = new Set<string>()
    const items: Blockly.utils.toolbox.BlockInfo[] = []

    function _push(toolboxItemInfos?: Blockly.utils.toolbox.ToolboxItemInfo[]) {
      for (const toolboxItemInfo of toolboxItemInfos ?? []) {
        if ('contents' in toolboxItemInfo) {
          _push(toolboxItemInfo.contents)
        } else if (toolboxItemInfo.kind.toLowerCase() === 'block') {
          if ('type' in toolboxItemInfo && toolboxItemInfo.type) {
            if (!seen.has(toolboxItemInfo.type)) {
              seen.add(toolboxItemInfo.type)
              items.push(toolboxItemInfo)
            }
          }
        }
      }
    }

    _push(this.workspace_.options.languageTree?.contents)
    this._searcher = new BlockSearcher(items)

    this._searchInput.placeholder = this.name_ ?? 'Search'
    this._searchInput.addEventListener('input', () => this.searchBlock())
    this._searchInput.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        this.parentToolbox_.clearSelection()
      }
    })
    this.rowContents_?.replaceChildren(this._searchInput)
  }

  override getFocusableElement(): HTMLElement | SVGElement {
    return this._searchInput
  }

  setSelected(isSelected: boolean): void {
    super.setSelected(isSelected)

    if (isSelected) {
      requestAnimationFrame(() => {
        this._searchInput.focus()
      })
    } else {
      this._searchInput.blur()
    }
  }

  override onNodeFocus(): void {
    this.searchBlock()
  }

  override onNodeBlur(): void {
    this._searchInput.value = ''
  }

  private searchBlock() {
    const contentItem = this._searcher?.search(this._searchInput.value) ?? []
    this.flyoutItems_ = contentItem
    if (this.flyoutItems_.length === 0) {
      this.flyoutItems_.push({
        kind: 'label',
        text: '未找到相关积木块',
      })
    }
    this.parentToolbox_.refreshSelection()
  }

  override dispose(): void {
    this._searchInput.remove()
  }
}

Blockly.registry.register(Blockly.registry.Type.TOOLBOX_ITEM, SearchToolboxCategory.SEARCH_CATEGORY_KIND, SearchToolboxCategory)
