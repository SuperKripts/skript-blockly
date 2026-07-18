import Fuse from 'fuse.js'
import * as Blockly from 'blockly/core'
import { t } from '@/locales/i18n'
import { pinyin } from 'pinyin-pro'
import * as BlocklyRegistry from '@/blockly/blocks/BlocklyRegistry'

export type BlockData = {
  type: string
  inputs: string[]
  inputsPinyin: string[]
  blockInfo: Blockly.utils.toolbox.BlockInfo
}

export class BlockSearcher {
  private readonly fuse: Fuse<BlockData>

  constructor() {
    const dataList: BlockData[] = []
    const tempWorkspace = new Blockly.Workspace()
    Object.values(BlocklyRegistry)
      .flat()
      .forEach((blockInfo) => {
        let block: Blockly.Block
        const blockxml = blockInfo.blockxml
        let type = blockInfo.type
        if (blockxml) {
          const xml = typeof blockxml === 'string' ? Blockly.utils.xml.textToDom(blockxml) : (blockxml as Element)
          block = Blockly.Xml.domToBlockInternal(xml, tempWorkspace)
          type = block.type
        } else if (type) {
          block = tempWorkspace.newBlock(type)
        } else {
          return
        }
        const inputs: string[] = []
        for (const input of block.inputList) {
          for (const field of input.fieldRow) {
            inputs.push(field.getText())
          }
        }
        dataList.push({ type, inputs, inputsPinyin: inputs.map((s) => pinyin(s, { toneType: 'none', separator: '' })), blockInfo })
      })
    tempWorkspace.dispose()

    console.log(dataList)

    this.fuse = new Fuse(dataList, {
      keys: ['type', 'inputs', 'inputsPinyin'],
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

    this._searcher = new BlockSearcher()

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
        text: t('BLOCKLY_NOT_FOUND'),
      })
    }
    this.parentToolbox_.refreshSelection()
  }

  override dispose(): void {
    this._searchInput.remove()
  }
}

Blockly.registry.register(Blockly.registry.Type.TOOLBOX_ITEM, SearchToolboxCategory.SEARCH_CATEGORY_KIND, SearchToolboxCategory)

const ctrlF = Blockly.ShortcutRegistry.registry.createSerializedKey(Blockly.utils.KeyCodes.F, [Blockly.utils.KeyCodes.CTRL])
const metaF = Blockly.ShortcutRegistry.registry.createSerializedKey(Blockly.utils.KeyCodes.F, [Blockly.utils.KeyCodes.META])

if (Blockly.ShortcutRegistry.registry.getKeyCodesByShortcutName('ToolboxSearch').length > 0) {
  Blockly.ShortcutRegistry.registry.unregister('ToolboxSearch')
}

Blockly.ShortcutRegistry.registry.register(
  {
    name: 'ToolboxSearch',
    keyCodes: [ctrlF, metaF],
    callback(workspace: Blockly.WorkspaceSvg, e: Event, _shortcut: Blockly.ShortcutRegistry.KeyboardShortcut, _scope: Blockly.ContextMenuRegistry.Scope) {
      e.preventDefault()
      e.stopPropagation()

      const toolbox = workspace.getToolbox() as Blockly.Toolbox
      const item = toolbox?.getToolboxItems().find((e) => e instanceof SearchToolboxCategory)
      if (!item) {
        return false
      }
      toolbox.setSelectedItem(item)
      workspace.refreshToolboxSelection()
      Blockly.FocusManager.getFocusManager().focusNode(item)

      return true
    },
  },
  false,
)
