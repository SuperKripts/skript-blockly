// syntax-marker-plugin.js
import fs from 'node:fs'
import path from 'node:path'
import * as ts from 'typescript'

const MARKER = 'skript syntax' // 固定标记

/**
 * 解析单个 TS 文件，检查标记和导出
 */
function parseFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true)

  let hasMarker = false
  let hasRegister = false
  let hasRegisterAll = false

  // 检查首行是否为标记指令
  if (sourceFile.statements.length > 0) {
    const first = sourceFile.statements[0]
    if (ts.isExpressionStatement(first) && ts.isStringLiteral(first.expression) && first.expression.text === MARKER) {
      hasMarker = true
    }
  }

  // 遍历 AST，查找导出的 register / registerAll
  function visit(node) {
    if (node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) {
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

/**
 * 为单个目录生成 index.ts 内容
 */
function generateIndexForDir(dirPath, fileNames) {
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
    console.log(fileName)

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
    return null // 没有匹配文件，不生成 index.ts
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

/**
 * 处理单个目录：如果该目录下有符合条件的 TS 文件，则生成 index.ts
 */
function processDirectory(dirPath) {
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true })
    const tsFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.ts') && entry.name !== 'index.ts').map((entry) => entry.name)

    if (tsFiles.length === 0) return

    const content = generateIndexForDir(dirPath, tsFiles)
    if (content === null) {
      // 没有匹配文件，如果存在旧的 index.ts 可以删除（可选）
      // 但为了避免误删，这里不处理，保留已有 index.ts 或留空
      return
    }

    const indexPath = path.join(dirPath, 'index.ts')
    fs.writeFileSync(indexPath, content, 'utf-8')
  } catch (err) {
    console.warn(`[syntax-marker-plugin] 处理目录 ${dirPath} 失败:`, err)
  }
}

/**
 * 递归遍历目录，处理每个子目录
 */
function processAllDirectories(rootDir) {
  if (!fs.existsSync(rootDir)) return

  const stack = [rootDir]
  while (stack.length > 0) {
    const current = stack.pop()
    const entries = fs.readdirSync(current, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name)
      if (entry.isDirectory()) {
        stack.push(fullPath)
      }
    }
    // 处理当前目录
    processDirectory(current)
  }
}

/**
 * Vite 插件
 * @param {string} scanDir - 要扫描的目录，例如 './src/blockly/blocks'
 */
export function syntaxMarkerPlugin(scanDir) {
  const resolvedScanDir = path.resolve(process.cwd(), scanDir)

  if (!fs.existsSync(resolvedScanDir)) {
    console.warn(`[syntax-marker-plugin] 目录不存在: ${scanDir}`)
  }

  function regenerateAll() {
    processAllDirectories(resolvedScanDir)
  }

  return {
    name: 'syntax-marker-plugin',

    configResolved() {
      regenerateAll()
    },

    configureServer(server) {
      // 监听整个扫描目录（包括子目录）
      server.watcher.add(resolvedScanDir)
      server.watcher.on('all', (event, changedPath) => {
        // 只关注 .ts 文件变化，且忽略 index.ts 自身
        if (changedPath.startsWith(resolvedScanDir) && changedPath.endsWith('.ts') && !changedPath.endsWith('index.ts')) {
          // 处理该文件所在的目录
          const dir = path.dirname(changedPath)
          processDirectory(dir)
        }
      })
    },

    transform(code, id) {
      if (id.endsWith('.ts') && !id.endsWith('index.ts') && (code.includes(`'${MARKER}'`) || code.includes(`"${MARKER}"`))) {
        const isProd = process.env.NODE_ENV === 'production'
        if (isProd) {
          const markerRegex = new RegExp(`^\\s*['"]${MARKER}['"]\\s*;?\\s*$`, 'm')
          return code.replace(markerRegex, '')
        }
      }
      return null
    },
  }
}
