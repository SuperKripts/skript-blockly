import { createHighlighterCore, type LanguageRegistration } from 'shiki/core'
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

export default await highlighter()
