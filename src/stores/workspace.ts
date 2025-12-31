import { defineStore } from 'pinia'
import * as Blockly from 'blockly/core'
import { ref, readonly, shallowRef, computed } from 'vue'
import SkriptCodeGenerator from '@/blockly/generators/skript'

type SkriptBlocklyContent = {
  skriptblockly: string
  // enableGrid: boolean
  data: object
}

export const useWorkspaceStore = defineStore('workspace', () => {
  const WORKSPACE_PREFIX = 'skriptblockly-workspace-'
  const CURRENT_WORKSPACE_KEY = 'skriptblockly-current-workspace'

  const _workspace = shallowRef<Blockly.Workspace | null>(null)
  const _workspaceNames = ref(getWorkspaceNamesFromBrowser())
  const _workspaceName = ref('未命名')
  const _isSaved = ref(true)
  const _code = ref('')
  const _grid = ref(true)
  const _state = ref('')

  const codeLine = computed(() => {
    return _code.value.split('\n').length
  })
  const blockCount = ref(0)

  function setWorkspace(workspace: Blockly.Workspace) {
    _workspace.value = workspace
    _workspace.value.addChangeListener((e: { type: string; isUiEvent: boolean }) => {
      // const needFilterTypes = ['click', 'selected', 'bubble_open', 'viewport_change', 'toolbox_item_select', 'trashcan_open']
      if (!e.isUiEvent) {
        _isSaved.value = false
        console.log(e)
      }
      if (e.type == 'create') {
        blockCount.value++
        _state.value = '添加方块'
      }
      if (e.type == 'delete') {
        blockCount.value--
        _state.value = '删除方块'
      }
      if (e.type == 'finished_loading') {
        blockCount.value = workspace.getAllBlocks().length
        _isSaved.value = true
        _state.value = '就绪'
      }
    })
    globalThis.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        saveWorkspaceToBrowser()
      }
    })

    globalThis.addEventListener('beforeunload', (e) => !_isSaved.value && e.preventDefault())

    const workspaceName = localStorage.getItem(CURRENT_WORKSPACE_KEY)
    if (workspaceName) {
      const content = localStorage.getItem(WORKSPACE_PREFIX + workspaceName)
      if (content) {
        loadWorkspace(JSON.parse(content))
      }
    }
  }

  function getWorkspace(): Blockly.Workspace {
    const workspace = _workspace.value
    if (workspace) {
      return workspace
    }
    throw new Error('Workspace not initialized')
  }

  function toggleGrid() {
    const workspace = getWorkspace() as Blockly.WorkspaceSvg
    if (_grid.value) {
      workspace.getGrid()?.setLength(0)
      _grid.value = false
    } else {
      workspace.getGrid()?.setLength(22)
      _grid.value = true
    }
  }

  function loadWorkspace(content: SkriptBlocklyContent) {
    if (!content.skriptblockly && !content.data) {
      alert('无效的SkriptBlock工作区文件')
      return
    }
    if (!_isSaved.value && !confirm('当前工作区未保存, 确定要加载其它工作区么')) {
      return
    }
    try {
      const workspace = getWorkspace()
      Blockly.serialization.workspaces.load(content.data, workspace)
      _workspaceName.value = content.skriptblockly
    } catch (error) {
      console.error(error)
      alert('无法加载工作区')
    }
  }

  function saveWorkspace(): SkriptBlocklyContent {
    const workspace = getWorkspace()
    const data = Blockly.serialization.workspaces.save(workspace)
    const content: SkriptBlocklyContent = {
      skriptblockly: _workspaceName.value,
      data: data,
    }
    return content
  }

  function newWorkspace(name?: string): boolean {
    const workspaceName = name ?? prompt('请输入新的工作区名称', '未命名')
    if (!workspaceName) {
      return false
    }
    if (getWorkspaceNamesFromBrowser().includes(workspaceName)) {
      alert('工作区名称已存在!')
      return false
    }
    loadWorkspace({ skriptblockly: workspaceName, data: {} })

    return true
  }

  function getWorkspaceNamesFromBrowser() {
    const workspaces = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith(WORKSPACE_PREFIX)) {
        workspaces.push(key.substring(WORKSPACE_PREFIX.length))
      }
    }
    return workspaces
  }

  function removeWorkspaceFromBrowser(name: string) {
    if (confirm('确定要删除这个工作区吗？')) {
      localStorage.removeItem(WORKSPACE_PREFIX + name)
      _workspaceNames.value = getWorkspaceNamesFromBrowser()
    }
  }

  function saveWorkspaceToBrowser() {
    const content = saveWorkspace()
    localStorage.setItem(WORKSPACE_PREFIX + content.skriptblockly, JSON.stringify(content))
    localStorage.setItem(CURRENT_WORKSPACE_KEY, content.skriptblockly)
    _isSaved.value = true
    _workspaceNames.value = getWorkspaceNamesFromBrowser()
    alert(`工作区 "${content.skriptblockly}" 已保存至浏览器`)
  }

  function loadWorkspaceFromBrowser(name?: string) {
    const workspaceName = name ?? localStorage.getItem(CURRENT_WORKSPACE_KEY)
    if (!workspaceName) {
      alert('没有保存的工作区')
      return
    }

    const item = localStorage.getItem(WORKSPACE_PREFIX + workspaceName)
    if (item) {
      try {
        const content: SkriptBlocklyContent = JSON.parse(item)
        loadWorkspace(content)
      } catch (e) {
        console.error('加载失败:', e)
        alert('工作区数据损坏')
      }
    } else {
      alert(`未找到工作区 "${workspaceName}"`)
    }
  }

  function saveWorkspaceToFile() {
    const content = saveWorkspace()
    const name = prompt('请输入文件名', content.skriptblockly + '.skriptblockly.json')
    if (name) {
      const blob = new Blob([JSON.stringify(content, null, 2)], {
        type: 'application/json;charset=utf-8',
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = name.endsWith('.json') ? name : name + '.json'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    }
  }

  function loadWorkspaceFromFile() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.skriptblockly.json,.json,*/*'

    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0]
      if (!file) return

      try {
        const text = await file.text()
        const content: SkriptBlocklyContent = JSON.parse(text)
        loadWorkspace(content)
        alert('工作区已从文件中加载')
      } catch (error) {
        console.error(error)
        alert('从文件加载工作区失败')
      }
    }

    input.click()
    input.remove()
  }

  async function saveWorkspaceToClipboard() {
    const content = saveWorkspace()
    const text = JSON.stringify(content, null, 2)
    try {
      await navigator.clipboard.writeText(text)
      alert('工作区已复制到剪贴板')
    } catch (error) {
      console.error(error)
      alert('当前浏览器不支持写入剪切板')
    }
  }

  async function loadWorkspaceFromClipboard() {
    try {
      const text = await navigator.clipboard.readText()
      const content: SkriptBlocklyContent = JSON.parse(text)
      loadWorkspace(content)
      alert('工作区已从剪贴板加载')
    } catch (err) {
      console.error(err)
      alert('当前浏览器不支持读取剪切板')
    }
  }

  function saveWorkspaceToConsole() {
    console.log(saveWorkspace())
  }

  function generateCode() {
    const workspace = getWorkspace()
    _code.value = SkriptCodeGenerator.workspaceToCode(workspace)
  }

  function generateCodeToFile() {
    generateCode()
    const name = prompt('请输入文件名', `${_workspaceName.value}.sk`)
    if (name) {
      const blob = new Blob([_code.value], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = name.endsWith('.sk') ? name : name + '.sk'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    }
  }

  async function generateCodeToClipboard() {
    generateCode()
    try {
      await navigator.clipboard.writeText(_code.value)
      alert('代码已复制到剪贴板')
    } catch (error) {
      console.error(error)
      alert('当前浏览器不支持写入剪切板')
    }
  }

  function generateCodeToConsole() {
    generateCode()
    console.log(_code.value)
  }

  return {
    workspace: _workspace,
    workspaceName: _workspaceName,
    workspaceNames: readonly(_workspaceNames),
    code: readonly(_code),
    isSaved: readonly(_isSaved),
    codeLine,
    blockCount,
    state: readonly(_state),
    grid: readonly(_grid),
    setWorkspace,
    saveWorkspaceToBrowser,
    loadWorkspaceFromBrowser,
    removeWorkspaceFromBrowser,
    saveWorkspaceToFile,
    loadWorkspaceFromFile,
    saveWorkspaceToClipboard,
    loadWorkspaceFromClipboard,
    saveWorkspaceToConsole,
    generateCodeToFile,
    generateCodeToClipboard,
    generateCodeToConsole,
    newWorkspace,
    toggleGrid,
    getWorkspace,
  }
})
