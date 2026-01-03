import * as Blockly from 'blockly/core'
import { t } from '@/locales/i18n'

export function createEventPriorityFieldDropdown() {
  return new Blockly.FieldDropdown([
    [t('SKRIPT_EVENT_PRIORITY_DEFAULT'), ''],
    [t('SKRIPT_EVENT_PRIORITY_LOWEST'), ' with priority lowest'],
    [t('SKRIPT_EVENT_PRIORITY_LOW'), ' with priority low'],
    [t('SKRIPT_EVENT_PRIORITY_NORMAL'), ' with priority normal'],
    [t('SKRIPT_EVENT_PRIORITY_HIGH'), ' with priority high'],
    [t('SKRIPT_EVENT_PRIORITY_HIGHEST'), ' with priority highest'],
    [t('SKRIPT_EVENT_PRIORITY_MONITOR'), ' with priority monitor'],
  ])
}
