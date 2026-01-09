import * as Blockly from 'blockly/core'
import { t } from '@/locales/i18n'

export const SuppertedEventPriority = ['default', 'lowest', 'low', 'normal', 'high', 'highest', 'monitor'] as const
export type EventPriority = (typeof SuppertedEventPriority)[number]
export function createEventPriorityFieldDropdown() {
  return new Blockly.FieldDropdown(SuppertedEventPriority.map((priority) => [t(`EVENT_PRIORITY_${priority.toUpperCase()}`), priority]))
}

export function generateCodeForEventPriority(priority: EventPriority) {
  return priority === 'default' ? '' : ' with priority ' + priority
}
