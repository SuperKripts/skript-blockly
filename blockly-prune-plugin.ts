import { PluginOption } from 'vite'

export function blocklyPrunePlugin(): PluginOption {
  return {
    name: 'blocklyPrune',
    transform(code, id) {
      if (id.endsWith('/node_modules/blockly/index.js')) {
        console.log(id)

        const newCode = code.replace(/blockly\/msg\/en/g, '')
        console.log(newCode)

        return {
          code: newCode,
        }
      }
    },
  }
}
