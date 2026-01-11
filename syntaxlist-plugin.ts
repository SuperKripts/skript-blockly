import { PluginOption } from 'vite'

function generateKey(keyId: number) {
  return keyId < 26 ? String.fromCodePoint(97 + keyId) : String.fromCodePoint(65 + (keyId - 26))
}

export function syntaxlistPlugin(): PluginOption {
  return {
    name: 'syntaxlist',
    async load(id) {
      if (id.endsWith('.syntaxlist.json')) {
        const raw = await this.fs.readFile(id, { encoding: 'utf8' })

        const content = Object.fromEntries(
          Object.entries(JSON.parse(raw))
            .filter(([key]) => key !== 'metadata')
            .map(([type, list]) => {
              const cleanedList = (list as Record<string, unknown>[]).map((item) => {
                const newItem = { ...item }
                delete newItem.description
                delete newItem.examples
                delete newItem.since
                return newItem
              })
              return [type, cleanedList]
            }),
        )
        return {
          code: JSON.stringify(content),
        }
      } else if (id.endsWith('syntaxlist.json')) {
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
              newKey = generateKey(keyId)
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

        return {
          code: JSON.stringify({ keyMap: Object.fromEntries(keyMap), addonMap: Object.fromEntries(addonMap), syntaxlist }),
        }
      }
    },
  }
}
