import * as Blockly from 'blockly/core'
import { FieldGridDropdown } from '@blockly/field-grid-dropdown'
import { t } from '@/locales/i18n'

export function buildMenuOption(name: string, args: string[]): () => Blockly.Field<string> {
  const options = args.map((e): Blockly.MenuOption => [t(`FIELD_OPTION_${name}_${e == '' ? 'DEFAULT' : e}`.toUpperCase()), e])
  return args.length < 9 ? () => new Blockly.FieldDropdown(options) : () => new FieldGridDropdown(options)
}
