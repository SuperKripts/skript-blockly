import fs from 'node:fs'
import path from 'node:path'
import * as ts from 'typescript'

const MARKER = 'skript syntax'

function parseFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true)

  let hasMarker = false
  let hasRegister = false
  let hasRegisterAll = false

  if (sourceFile.statements.length > 0) {
    const first = sourceFile.statements[0]
    if (ts.isExpressionStatement(first) && ts.isStringLiteral(first.expression) && first.expression.text === MARKER) {
      hasMarker = true
    }
  }

  function visit(node: ts.Node) {
    if (ts.canHaveModifiers(node)) {
      const modifiers = ts.getModifiers(node)
      if (modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) {
        let name = null
        if (ts.isFunctionDeclaration(node) && node.name) {
          name = node.name.text
        } else if (ts.isVariableStatement(node)) {
          const decl = node.declarationList.declarations[0]
          if (decl && ts.isIdentifier(decl.name)) {
            name = decl.name.text
          }
        } else if (ts.isClassDeclaration(node) && node.name) {
          name = node.name.text
        }
        if (name === 'register') hasRegister = true
        if (name === 'registerAll') hasRegisterAll = true
      }
    }

    if (ts.isExportDeclaration(node)) {
      const clause = node.exportClause
      if (clause && ts.isNamedExports(clause)) {
        for (const spec of clause.elements) {
          const name = spec.name.text
          if (name === 'register') hasRegister = true
          if (name === 'registerAll') hasRegisterAll = true
        }
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return { hasMarker, hasRegister, hasRegisterAll }
}

function generateIndexForDir(dirPath: string, fileNames: string[]) {
  const imports = []
  const calls = []

  for (const fileName of fileNames) {
    const fullPath = path.join(dirPath, fileName)
    const { hasMarker, hasRegister, hasRegisterAll } = parseFile(fullPath)

    if (!hasMarker) continue

    if (!hasRegister && !hasRegisterAll) continue

    const baseName = path.basename(fileName, path.extname(fileName))
    const safeName = baseName.replace(/\W/g, '_')
    let funcName, alias

    if (hasRegisterAll) {
      funcName = 'registerAll'
      alias = `registerAll_${safeName}`
      calls.push(`  BlockInfos.push(...${alias}());`)
    } else {
      funcName = 'register'
      alias = `register_${safeName}`
      calls.push(`  BlockInfos.push(${alias}());`)
    }

    imports.push(`import { ${funcName} as ${alias} } from './${fileName}'`)
  }

  if (imports.length === 0) {
    return null
  }

  return `import * as Blockly from 'blockly/core'
${imports.join('\n')}

export const BlockInfos: Blockly.utils.toolbox.BlockInfo[] = []

function register() {
${calls.join('\n')}
}

register()
`
}

function processDirectory(dirPath: string) {
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true })
    const tsFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.ts') && entry.name !== 'index.ts').map((entry) => entry.name)

    if (tsFiles.length === 0) return

    const content = generateIndexForDir(dirPath, tsFiles)
    if (content === null) {
      return
    }

    const indexPath = path.join(dirPath, 'index.ts')
    fs.writeFileSync(indexPath, content, 'utf-8')
  } catch (err) {
    console.warn(`[syntax-marker-plugin] 处理目录 ${dirPath} 失败:`, err)
  }
}

function processAllDirectories(rootDir: string) {
  if (!fs.existsSync(rootDir)) return

  const stack = [rootDir]
  while (stack.length > 0) {
    const current = stack.pop()
    if (!current) continue
    const entries = fs.readdirSync(current, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name)
      if (entry.isDirectory()) {
        stack.push(fullPath)
      }
    }
    processDirectory(current)
  }
}

export function syntaxMarkerPlugin(scanDir: string) {
  const resolvedScanDir = path.resolve(process.cwd(), scanDir)

  if (!fs.existsSync(resolvedScanDir)) {
    console.warn(`[syntax-marker-plugin] 目录不存在: ${scanDir}`)
  }

  return {
    name: 'syntax-marker-plugin',

    configResolved() {
      processAllDirectories(resolvedScanDir)
    },

    handleHotUpdate({ file, modules }: { file: string; modules: string[] }) {
      if (file.endsWith('.ts')) {
        const dir = path.dirname(file)
        processDirectory(dir)
      }

      return modules
    },

    transform(code: string, id: string) {
      if (id.endsWith('.ts') && !id.endsWith('index.ts') && (code.includes(`'${MARKER}'`) || code.includes(`"${MARKER}"`))) {
        const isProd = process.env.NODE_ENV === 'production'
        if (isProd) {
          const markerRegex = new RegExp(String.raw`^\s*['"]${MARKER}['"]\s*;?\s*$`, 'm')
          return code.replace(markerRegex, '')
        }
      }
      return null
    },
  }
}
