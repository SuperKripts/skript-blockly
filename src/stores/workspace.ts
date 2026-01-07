import { defineStore } from 'pinia'
import * as Blockly from 'blockly/core'
import { ref, readonly, shallowRef, computed } from 'vue'
import SkriptCodeGenerator from '@/blockly/generators/skript'
import { t } from '@/locales/i18n'

type SkriptBlocklyContent = {
  skriptblockly: string
  // enableGrid: boolean
  data: object
}

export const useWorkspaceStore = defineStore('workspace', () => {
  const INDEXED_DB_VERSION = 1
  const CURRENT_WORKSPACE_KEY = 'skriptblockly-current-workspace'

  const _workspace = shallowRef<Blockly.Workspace | null>(null)
  const _workspaceNames = ref<string[]>([])
  const _workspaceName = ref(t('WORKSPACE_DEFAULT_NAME'))
  const _isSaved = ref(true)
  const _code = ref('')
  const _grid = ref(true)
  const _state = ref('')

  updateWorkspaceNames()

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
        _state.value = t('STATE_ADD_BLOCKLY')
      }
      if (e.type == 'delete') {
        blockCount.value--
        _state.value = t('STATE_REMOVE_BLOCKLY')
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
        const ele = document.activeElement as HTMLTextAreaElement
        if (ele?.classList.contains('blocklyCommentText')) {
          ele.blur()
        }
        saveWorkspaceToBrowser()
      }
    })

    globalThis.addEventListener('beforeunload', (e) => !_isSaved.value && e.preventDefault())
    loadWorkspaceFromBrowser()
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

  async function newWorkspace(name?: string): Promise<boolean> {
    const workspaceName = name ?? prompt('请输入新的工作区名称', t('WORKSPACE_DEFAULT_NAME'))
    if (!workspaceName) {
      return false
    }
    if (await getWorkspaceNamesFromBrowser().then((names) => names.includes(workspaceName))) {
      alert('工作区名称已存在!')
      return false
    }
    loadWorkspace({ skriptblockly: workspaceName, data: {} })

    return true
  }

  async function openIndexedDB() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open('skriptblockly-workspaces', INDEXED_DB_VERSION)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(new Error('无法打开IndexedDB'))
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains('workspaces')) {
          db.createObjectStore('workspaces')
        }
      }
    })
  }

  function updateWorkspaceNames() {
    getWorkspaceNamesFromBrowser().then((names) => {
      _workspaceNames.value = names
    })
  }

  async function getWorkspaceNamesFromBrowser(): Promise<string[]> {
    const db = await openIndexedDB()
    const transaction = db.transaction('workspaces', 'readonly')
    const objectStore = transaction.objectStore('workspaces')
    const request = objectStore.getAllKeys()
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result as string[])
      request.onerror = () => reject(new Error('无法获取工作区列表'))
    })
  }

  function removeWorkspaceFromBrowser(name: string) {
    if (confirm('确定要删除这个工作区吗？')) {
      openIndexedDB().then((db) => {
        const transaction = db.transaction('workspaces', 'readwrite')
        const objectStore = transaction.objectStore('workspaces')
        const request = objectStore.delete(name)
        request.onsuccess = function () {
          alert(`工作区 "${name}" 已删除`)
          updateWorkspaceNames()
        }
        request.onerror = function () {
          alert('删除工作区失败')
        }
      })
    }
  }

  function saveWorkspaceToBrowser() {
    const content = saveWorkspace()
    openIndexedDB().then((db) => {
      const transaction = db.transaction('workspaces', 'readwrite')
      const objectStore = transaction.objectStore('workspaces')
      const request = objectStore.put(content, content.skriptblockly)
      request.onsuccess = function () {
        alert(`工作区 "${content.skriptblockly}" 已保存至浏览器`)
        localStorage.setItem(CURRENT_WORKSPACE_KEY, content.skriptblockly)
        _isSaved.value = true
        updateWorkspaceNames()
      }
      request.onerror = function () {
        alert('保存工作区失败')
      }
    })
  }

  function loadWorkspaceFromBrowser(name?: string) {
    if (name) {
      openIndexedDB().then((db) => {
        const transaction = db.transaction('workspaces', 'readonly')
        const objectStore = transaction.objectStore('workspaces')
        const request = objectStore.get(name)
        request.onsuccess = function () {
          const content = request.result
          if (content) {
            loadWorkspace(content)
            localStorage.setItem(CURRENT_WORKSPACE_KEY, name)
            alert(`工作区 "${name}" 已从浏览器加载`)
          } else {
            alert(`工作区 "${name}" 不存在`)
          }
        }
        request.onerror = function () {
          alert('加载工作区失败')
        }
      })
    } else {
      const workspaceName = localStorage.getItem(CURRENT_WORKSPACE_KEY)
      if (!workspaceName) {
        return
      }
      openIndexedDB().then((db) => {
        const transaction = db.transaction('workspaces', 'readonly')
        const objectStore = transaction.objectStore('workspaces')
        const request = objectStore.get(workspaceName)
        request.onsuccess = function () {
          const content = request.result
          if (content) {
            loadWorkspace(content)
          } else {
            alert(`工作区 "${workspaceName}" 不存在`)
          }
        }
        request.onerror = function () {
          alert('加载工作区失败')
        }
      })
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
    copyCodeToClipboard()
  }

  async function copyCodeToClipboard() {
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
    generateCode,
    generateCodeToFile,
    generateCodeToClipboard,
    generateCodeToConsole,
    copyCodeToClipboard,
    newWorkspace,
    toggleGrid,
    getWorkspace,
  }
})
