import * as Blockly from 'blockly/core'
import { t } from '@/locales/i18n'
import { register as registerVariableBlock } from './Variables'

registerVariableBlock()

const VARIABLE_CATEGORY_KIND = 'variables'

export class VariableToolboxCategory extends Blockly.ToolboxCategory {
  init(): void {
    super.init()

    this.workspace_.registerButtonCallback('addVariable', (button: Blockly.FlyoutButton) => Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace()))
    this.workspace_.addChangeListener((e: Blockly.Events.Abstract) => {
      switch (e.type) {
        case Blockly.Events.VAR_CREATE:
        case Blockly.Events.VAR_DELETE:
        case Blockly.Events.VAR_RENAME:
          this.updateVariable()
      }
    })
    this.updateVariable()
  }
  updateVariable(): void {
    const addButton = {
      kind: 'button',
      text: t('VARIABLE_ADD'),
      callbackkey: 'addVariable',
    }
    const variables = this.workspace_.getVariableMap().getAllVariables()
    const contents: Blockly.utils.toolbox.FlyoutItemInfoArray = variables
      .slice()
      .sort((a, b) => a.getName().localeCompare(b.getName()))
      .map((variable) => {
        return {
          kind: 'block',
          type: 'variables_get',
          fields: { VAR: { name: variable.getName(), type: variable.getType() } },
        }
      })
    contents.unshift(addButton)
    this.updateFlyoutContents(contents)
  }
}

if (Blockly.registry.hasItem(Blockly.registry.Type.TOOLBOX_ITEM, VARIABLE_CATEGORY_KIND)) {
  Blockly.registry.unregister(Blockly.registry.Type.TOOLBOX_ITEM, VARIABLE_CATEGORY_KIND)
}
Blockly.registry.register(Blockly.registry.Type.TOOLBOX_ITEM, VARIABLE_CATEGORY_KIND, VariableToolboxCategory)
