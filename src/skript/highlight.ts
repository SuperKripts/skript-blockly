import { createHighlighterCore, type LanguageRegistration, type ShikiTransformer } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import SkriptGrammar from '@/assets/skript-grammar.json'
import Theme from 'shiki/themes/github-light-default.mjs'
import DarkTheme from 'shiki/themes/github-dark-default.mjs'

async function highlighter() {
  return createHighlighterCore({
    langs: [SkriptGrammar as unknown as LanguageRegistration],
    themes: [Theme, DarkTheme],
    engine: createJavaScriptRegexEngine(),
  })
}

export function lineNumbersTransformer(): ShikiTransformer {
  return {
    name: 'line-numbers',
    pre(node) {
      node.children.unshift({
        type: 'element',
        tagName: 'style',
        properties: {},
        children: [{ type: 'text', value: css() }],
      })
    },
    line(node, line) {
      node.properties = node.properties || {}
      node.properties['data-line'] = String(line)
    },
  }
}

function css(): string {
  return `.code_view pre {
  counter-reset: line;
}

.code_view .line {
  position: relative;
  padding-left: 3.5em;
  min-height: 1.2em;
}

.code_view .line::before {
  content: attr(data-line);
  position: absolute;
  left: 0.5em;
  color: var(--text-secondary, #888);
  user-select: none;
  text-align: right;
  width: 2em;
  font-size: 10px;
}`
}

export default await highlighter()
