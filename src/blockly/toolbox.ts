import * as Blockly from 'blockly/core'

import '@/blockly/config'
import * as BlocklyRegistry from '@/blockly/blocks/BlocklyRegistry'
import '@/blockly/utils/ToolboxSearch'
import '@/blockly/blocks/variables/ToolboxVariable'
import { t } from '@/locales/i18n'

function customCss(type: string): Blockly.ToolboxCategory.CssConfig {
  return {
    container: 'blocklyToolboxCategoryContainer toolbox-' + type,
    contents: 'blocklyToolboxCategoryGroup toolbox-' + type,
    icon: 'blocklyToolboxCategoryIcon toolbox-' + type,
    label: 'blocklyToolboxCategoryLabel toolbox-' + type,
    row: 'blocklyToolboxCategory toolbox-' + type,
    rowcontentcontainer: 'blocklyTreeRowContentContainer toolbox-' + type,
    selected: 'blocklyToolboxSelected toolbox-' + type,
    openicon: 'blocklyToolboxCategoryIconOpen toolbox-' + type,
    closedicon: 'blocklyToolboxCategoryIconClosed toolbox-' + type,
  }
}

function toolbox(): Blockly.utils.toolbox.ToolboxDefinition {
  const toolboxContents: Blockly.utils.toolbox.ToolboxItemInfo[] = []
  toolboxContents.push({
    kind: 'search',
    name: t('BLOCKLY_SEARCH'),
  })

  Object.entries(BlocklyRegistry).forEach((type) => {
    if (type[0].endsWith('BlockInfos')) {
      const syntaxType = type[0].slice(0, -10)
      toolboxContents.push({
        kind: 'category',
        name: t('SYNTAX_TYPE_' + syntaxType.toUpperCase()),
        cssconfig: customCss(syntaxType),
        contents: type[1],
      })
    }
  })

  toolboxContents.push({
    kind: 'variables',
    name: t('SYNTAX_TYPE_VARIABLE'),
    cssconfig: customCss('variable'),
  })

  return {
    kind: 'categoryToolbox',
    contents: toolboxContents,
  }
}

export default toolbox
