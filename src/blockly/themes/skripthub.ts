import * as Blockly from 'blockly/core'

// 主题 改用css定义样式
export const skript = Blockly.Theme.defineTheme('skript', {
  name: 'skript',
  base: Blockly.Themes.Classic,
  // componentStyles: {
  //   workspaceBackgroundColour: '#f7f7f7',
  //   toolboxBackgroundColour: '#394259',
  //   toolboxForegroundColour: '#FFFFFF',
  //   flyoutBackgroundColour: '#373F54',
  // },
  // categoryStyles: {
  //   event: {
  //     colour: '#A763FF',
  //   },
  //   condition: {
  //     colour: '#FF3D3D',
  //   },
  //   effect: {
  //     colour: '#0178FF',
  //   },
  //   expression: {
  //     colour: '#0DE505',
  //   },
  //   type: {
  //     colour: '#F39C12',
  //   },
  //   function: {
  //     colour: '#B4B4B4',
  //   },
  //   section: {
  //     colour: '#1ABC9C',
  //   },
  //   structure: {
  //     colour: '#E056FD',
  //   },
  // },
  blockStyles: {
    event: {
      colourPrimary: '#A763FF',
    },
    condition: {
      colourPrimary: '#FF3D3D',
    },
    effect: {
      colourPrimary: '#0178FF',
    },
    expression: {
      colourPrimary: '#0DE505',
    },
    type: {
      colourPrimary: '#F39C12',
    },
    function: {
      colourPrimary: '#B4B4B4',
    },
    section: {
      colourPrimary: '#1ABC9C',
    },
    structure: {
      colourPrimary: '#E056FD',
    },
  },
  fontStyle: {},
  startHats: false,
})
