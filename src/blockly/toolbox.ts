import * as Blockly from 'blockly/core'

import '@/blockly/config'
import * as BlocklyRegistry from '@/blockly/blocks/BlocklyRegistry'
import '@/blockly/utils/ToolboxSearch'
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
  return {
    kind: 'categoryToolbox',
    contents: [
      {
        kind: 'search',
        name: t('BLOCKLY_SEARCH'),
      },
      // ...Object.values(SyntaxType),
      // {
      //   kind: 'sep',
      // },
      {
        kind: 'category',
        name: t('SYNTAX_TYPE_EVENT'),
        cssconfig: customCss('event'),
        contents: BlocklyRegistry.eventBlockInfos,
      },
      {
        kind: 'category',
        name: t('SYNTAX_TYPE_CONDITION'),
        cssconfig: customCss('condition'),
        contents: BlocklyRegistry.conditionBlockInfos,
      },
      {
        kind: 'category',
        name: t('SYNTAX_TYPE_EFFECT'),
        cssconfig: customCss('effect'),
        contents: BlocklyRegistry.effectBlockInfos,
      },
      {
        kind: 'category',
        name: t('SYNTAX_TYPE_EXPRESSION'),
        cssconfig: customCss('expression'),
        contents: BlocklyRegistry.expressionBlockInfos,
      },
      {
        kind: 'category',
        name: t('SYNTAX_TYPE_TYPE'),
        cssconfig: customCss('type'),
        contents: BlocklyRegistry.typeBlockInfos,
      },
      {
        kind: 'category',
        name: t('SYNTAX_TYPE_FUNCTION'),
        cssconfig: customCss('function'),
        contents: [],
      },
      {
        kind: 'category',
        name: t('SYNTAX_TYPE_SECTION'),
        cssconfig: customCss('section'),
        contents: BlocklyRegistry.sectionBlockInfos,
      },
      {
        kind: 'category',
        name: t('SYNTAX_TYPE_STRUCTURE'),
        cssconfig: customCss('structure'),
        contents: BlocklyRegistry.structureBlockInfos,
      },
      // {
      //   kind: 'category',
      //   name: '函数',
      //   custom: 'PROCEDURE',
      //   // cssconfig: customCss('procedure_category',
      // },
      // {
      //   kind: 'category',
      //   name: '变量',
      //   custom: 'VARIABLE',
      //   // cssconfig: customCss('variable_category',
      // },
      {
        kind: 'category',
        name: '测试',
        cssconfig: customCss('event'),
        contents: [
          // {
          //   kind: 'block',
          //   type: 'event_join',
          // },
          {
            kind: 'category',
            name: '测试1',
            contents: [
              // {
              //   kind: 'block',
              //   type: 'event_join',
              // },
            ],
          },
          {
            kind: 'category',
            name: '测试2',
            contents: [
              // {
              //   kind: 'block',
              //   type: 'event_join',
              // },
            ],
          },
        ],
      },
      // {
      //   kind: 'category',
      //   name: '最常使用 ',
      //   custom: 'MOST_USED',
      //   cssconfig: customCss('frequently_used_category'),
      // },
      // {
      //   kind: 'category',
      //   name: '最近使用',
      //   custom: 'RECENTLY_USED',
      //   cssconfig: customCss('recently_used_category'),
      // },
    ],
  }
}

export default toolbox
