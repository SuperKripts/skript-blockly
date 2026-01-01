import * as Blockly from 'blockly/core'

export class SkriptCodeGenerator extends Blockly.Generator {
  constructor() {
    super('Skript')
    this.INDENT = '    '
  }

  init(_workspace: Blockly.Workspace): void {
    super.init(_workspace)

    if (this.nameDB_) {
      this.nameDB_.reset()
    } else {
      this.nameDB_ = new Blockly.Names(this.RESERVED_WORDS_)
    }

    this.nameDB_.setVariableMap(_workspace.getVariableMap())
    this.nameDB_.populateVariables(_workspace)
    this.nameDB_.populateProcedures(_workspace)

    this.isInitialized = true
  }

  public scrub_(_block: Blockly.Block, code: string, _opt_thisOnly?: boolean | undefined): string {
    let comments = _block.getCommentText() ?? ''
    if (comments != '') {
      comments =
        comments
          .split('\n')
          .map((s) => '# ' + s)
          .join('\n') + '\n'
    }
    const nextBlock = _block.nextConnection?.targetBlock()
    if (nextBlock && !_opt_thisOnly) {
      return comments + code + '\n' + this.blockToCode(nextBlock)
    }
    return comments + code
  }
}

export const generator = new SkriptCodeGenerator()

export default generator

export const Order = {
  ATOMIC: 0,
}

/**
 * 代码拼接
 *
 * @param codes 代码
 * @returns 代码
 */
export function codeJoin(...codes: string[]): string {
  return codes.filter((str) => str !== '').join(' ')
}

/**
 * 数组拼接
 *
 * @param codes 代码
 * @returns 代码
 */
export function arrayJoin(codes: string[], quote = false): string {
  if (codes.length == 0) {
    return quote ? '""' : ''
  }
  if (codes.length == 1) {
    return quote ? `"${codes[0]!}"` : codes[0]!
  }

  const lastIndex = codes.length - 1
  const rest = codes.slice(0, lastIndex)
  const lastElement = codes[lastIndex]

  const restPart = quote ? rest.map((s) => `"${s}"`).join(', ') : rest.join(', ')
  const lastPart = quote ? `"${lastElement}"` : lastElement

  return `${restPart} and ${lastPart}`
}
