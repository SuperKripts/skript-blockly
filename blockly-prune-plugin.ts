import { PluginOption } from 'vite'

export function blocklyPrunePlugin(): PluginOption {
  return {
    name: 'blocklyPrune',
    async load(id) {
      if (id.endsWith('/node_modules/blockly/index.js')) {
        const content = await this.fs.readFile(id, { encoding: 'utf8' })
        return {
          code: content.replace("require('blockly/msg/en')", '{}').replace("require('blockly/blocks')", 'undefined'),
        }
      }
    },
  }
}
