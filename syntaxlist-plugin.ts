import { PluginOption } from 'vite'

export function syntaxlistPlugin(): PluginOption {
  return {
    name: 'syntaxlist',
    async load(id) {
      if (id.endsWith('syntaxlist.json')) {
        const keyMap = new Map()
        const addonMap = new Map()
        const syntaxlist = []
        let keyId = 0
        const content = (await JSON.parse((await this.fs.readFile(id, { encoding: 'utf8' })).toString())) as Record<string, unknown>[]

        function compress(value: unknown): unknown {
          if (value == null || typeof value !== 'object') {
            return value
          }

          if (Array.isArray(value)) {
            return value.map(compress)
          }

          const result: Record<string, unknown> = {}
          for (const key in value) {
            if (key === 'description' || key === 'created_at' || key === 'updated_at' || key === 'get_syntax_type_css_class') {
              continue
            }

            const rawValue = (value as Record<string, unknown>)[key]

            if (rawValue == null || rawValue == '' || (Array.isArray(value) && value.length === 0)) continue

            let newKey = keyMap.get(key)
            if (newKey === undefined) {
              newKey = keyId < 26 ? String.fromCodePoint(97 + keyId) : String.fromCodePoint(65 + (keyId - 26))
              keyMap.set(key, newKey)
              keyId++
            }

            if (key === 'addon') {
              const addonName = (rawValue as Record<string, unknown>)['name'] as string
              if (!addonMap.has(addonName)) {
                addonMap.set(addonName, rawValue)
              }
              result[newKey] = addonName
              continue
            }

            result[newKey] = compress(rawValue)
          }
          return result
        }
        for (const a of content) {
          if ((a['addon'] as Record<string, unknown>)['name'] !== 'Skript') {
            continue
          }
          syntaxlist.push(compress(a))
        }

        console.log(addonMap)
        return {
          code: JSON.stringify({ keyMap: Object.fromEntries(keyMap), addonMap: Object.fromEntries(addonMap), syntaxlist }),
        }
      }
    },
    transform(code, id) {
      if (id.endsWith('syntaxlist.json')) {
        // console.log(code)
      }
    },
  }
}
