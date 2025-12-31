import * as Blockly from 'blockly/core'
import I18n from '@/blockly/langs/i18n'

export function createEventPriorityFieldDropdown() {
  return new Blockly.FieldDropdown([
    [I18n.getLang('SKRIPT_EVENT_PRIORITY_DEFAULT'), ''],
    [I18n.getLang('SKRIPT_EVENT_PRIORITY_LOWEST'), ' with priority lowest'],
    [I18n.getLang('SKRIPT_EVENT_PRIORITY_LOW'), ' with priority low'],
    [I18n.getLang('SKRIPT_EVENT_PRIORITY_NORMAL'), ' with priority normal'],
    [I18n.getLang('SKRIPT_EVENT_PRIORITY_HIGH'), ' with priority high'],
    [I18n.getLang('SKRIPT_EVENT_PRIORITY_HIGHEST'), ' with priority highest'],
    [I18n.getLang('SKRIPT_EVENT_PRIORITY_MONITOR'), ' with priority monitor'],
  ])
}
