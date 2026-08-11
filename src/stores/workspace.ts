import { defineStore } from 'pinia'
import * as Blockly from 'blockly/core'
import { ref, readonly, shallowRef, computed } from 'vue'
import SkriptCodeGenerator from '@/blockly/generators/skript'
import { t } from '@/locales/i18n'
import { useDialogStore } from './dialog'

type SkriptBlocklyContent = {
  skriptblockly: string
  // enableGrid: boolean
  data: object
}

export const useWorkspaceStore = defineStore('workspace', () => {
  const INDEXED_DB_VERSION = 1
  const CURRENT_WORKSPACE_KEY = 'skriptblockly-current-workspace'

  const dialog = useDialogStore()

  const _workspace = shallowRef<Blockly.Workspace | null>(null)
  const _workspaceNames = ref<string[]>([])
  const _workspaceName = ref(t('WORKSPACE_DEFAULT_NAME'))
  const _isSaved = ref(true)
  const _code = ref('')
  const _grid = ref(true)
  const _state = ref('')
  const _toolbox = ref(true)

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
        // console.log(e)
      }
      if (e.type === Blockly.Events.BLOCK_CREATE) {
        blockCount.value++
        _state.value = t('STATE_ADD_BLOCKLY')
      }
      if (e.type === Blockly.Events.BLOCK_DELETE) {
        blockCount.value--
        _state.value = t('STATE_REMOVE_BLOCKLY')
      }
      if (e.type === Blockly.Events.FINISHED_LOADING) {
        blockCount.value = workspace.getAllBlocks().length
        _isSaved.value = true
        _state.value = t('WORKSPACE_STATUS_READY')
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

  function toggleToolbox() {
    const workspace = getWorkspace() as Blockly.WorkspaceSvg
    const toolbox = workspace.getToolbox()
    if (toolbox) {
      if (_toolbox.value) {
        toolbox.setVisible(false)
        _toolbox.value = false
      } else {
        toolbox.setVisible(true)
        _toolbox.value = true
      }
    }
  }

  async function loadWorkspace(content: SkriptBlocklyContent): Promise<boolean> {
    if (!content.skriptblockly && !content.data) {
      await dialog.$alert(t('WORKSPACE_INVALID_FILE'))
      return false
    }
    if (!_isSaved.value && !(await dialog.$confirm(t('WORKSPACE_UNSAVED_CONFIRM')))) {
      return false
    }
    try {
      const workspace = getWorkspace()
      Blockly.serialization.workspaces.load(content.data, workspace)
      _workspaceName.value = content.skriptblockly
      return true
    } catch (error) {
      console.error(error)
      await dialog.$alert(t('WORKSPACE_LOAD_FAILED'))
      return false
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
    const workspaceName = name ?? (await dialog.$prompt(t('WORKSPACE_INPUT_NEW_NAME'), t('WORKSPACE_DEFAULT_NAME')))
    if (!workspaceName) {
      return false
    }
    if (await getWorkspaceNamesFromBrowser().then((names) => names.includes(workspaceName))) {
      await dialog.$alert(t('WORKSPACE_NAME_EXISTS'))
      return false
    }
    await loadWorkspace({ skriptblockly: workspaceName, data: {} })

    return true
  }

  async function openIndexedDB() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open('skriptblockly-workspaces', INDEXED_DB_VERSION)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(new Error('Failed to open IndexedDB'))
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
    return new Promise<string[]>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result as string[])
      request.onerror = () => reject(new Error('Failed to fetch workspace list'))
    }).finally(() => db.close())
  }

  async function removeWorkspaceFromBrowser(name: string): Promise<void> {
    if (!(await dialog.$confirm(t('WORKSPACE_DELETE_CONFIRM')))) {
      return
    }
    try {
      const db = await openIndexedDB()
      await new Promise<void>((resolve, reject) => {
        const transaction = db.transaction('workspaces', 'readwrite')
        const objectStore = transaction.objectStore('workspaces')
        const request = objectStore.delete(name)
        request.onsuccess = () => resolve()
        request.onerror = () => reject(new Error('Delete failed'))
      }).finally(() => db.close())
      await dialog.$alert(t('WORKSPACE_DELETED', { name }))
      updateWorkspaceNames()
    } catch (error) {
      console.error(error)
      await dialog.$alert(t('WORKSPACE_DELETE_ERROR'))
    }
  }

  async function saveWorkspaceToBrowser(): Promise<void> {
    const content = saveWorkspace()
    try {
      const db = await openIndexedDB()
      await new Promise<void>((resolve, reject) => {
        const transaction = db.transaction('workspaces', 'readwrite')
        const objectStore = transaction.objectStore('workspaces')
        const request = objectStore.put(content, content.skriptblockly)
        request.onsuccess = () => resolve()
        request.onerror = () => reject(new Error('Save failed'))
      }).finally(() => db.close())
      localStorage.setItem(CURRENT_WORKSPACE_KEY, content.skriptblockly)
      _isSaved.value = true
      updateWorkspaceNames()
      await dialog.$alert(t('WORKSPACE_SAVED_TO_BROWSER', [content.skriptblockly]))
    } catch (error) {
      console.error(error)
      await dialog.$alert(t('WORKSPACE_SAVE_ERROR'))
    }
  }

  async function loadWorkspaceFromBrowser(name?: string): Promise<void> {
    try {
      const workspaceName = name ?? localStorage.getItem(CURRENT_WORKSPACE_KEY)
      if (!workspaceName) {
        return
      }
      const db = await openIndexedDB()
      const content = await new Promise<SkriptBlocklyContent | undefined>((resolve, reject) => {
        const transaction = db.transaction('workspaces', 'readonly')
        const objectStore = transaction.objectStore('workspaces')
        const request = objectStore.get(workspaceName)
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(new Error('Load failed'))
      }).finally(() => db.close())
      if (content) {
        const loaded = await loadWorkspace(content)
        if (loaded && name) {
          localStorage.setItem(CURRENT_WORKSPACE_KEY, name)
          await dialog.$alert(t('WORKSPACE_LOADED_FROM_BROWSER', { name }))
        }
      } else if (name) {
        await dialog.$alert(t('WORKSPACE_NOT_EXISTS', { name }))
      }
    } catch (error) {
      console.error(error)
      if (name) {
        await dialog.$alert(t('WORKSPACE_LOAD_ERROR'))
      }
    }
  }

  async function saveWorkspaceToFile(): Promise<void> {
    const content = saveWorkspace()
    const name = await dialog.$prompt(t('WORKSPACE_INPUT_FILE_NAME'), content.skriptblockly + '.skriptblockly.json')
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
        const loaded = await loadWorkspace(content)
        if (loaded) {
          await dialog.$alert(t('WORKSPACE_LOADED_FROM_FILE'))
        }
      } catch (error) {
        console.error(error)
        await dialog.$alert(t('WORKSPACE_LOAD_FROM_FILE_FAILED'))
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
      await dialog.$alert(t('WORKSPACE_COPIED_TO_CLIPBOARD'))
    } catch (error) {
      console.error(error)
      await dialog.$alert(t('WORKSPACE_CLIPBOARD_WRITE_UNSUPPORTED'))
    }
  }

  async function loadWorkspaceFromClipboard() {
    try {
      const text = await navigator.clipboard.readText()
      const content: SkriptBlocklyContent = JSON.parse(text)
      const loaded = await loadWorkspace(content)
      if (loaded) {
        await dialog.$alert(t('WORKSPACE_LOADED_FROM_CLIPBOARD'))
      }
    } catch (err) {
      console.error(err)
      await dialog.$alert(t('WORKSPACE_CLIPBOARD_READ_UNSUPPORTED'))
    }
  }

  function saveWorkspaceToConsole() {
    console.log(saveWorkspace())
  }

  function generateCode() {
    const workspace = getWorkspace()
    _code.value = SkriptCodeGenerator.workspaceToCode(workspace)
  }

  async function generateCodeToFile(): Promise<void> {
    generateCode()
    const name = await dialog.$prompt(t('WORKSPACE_INPUT_FILE_NAME'), `${_workspaceName.value}.sk`)
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
      await dialog.$alert(t('WORKSPACE_CODE_COPIED_TO_CLIPBOARD'))
    } catch (error) {
      console.error(error)
      await dialog.$alert(t('WORKSPACE_CLIPBOARD_WRITE_UNSUPPORTED'))
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
    toolbox: readonly(_toolbox),
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
    toggleToolbox,
    getWorkspace,
  }
})
