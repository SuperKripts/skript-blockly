import * as Blockly from 'blockly/core'
import type { EventSyntax } from '@/skript/SyntaxRegistry'
import { createEventCodeGenerator, createEventDefinition, generateEventBlockKey, type SkriptEventBlock } from '@/blockly/blocks/events/EventBlock'
import CodeGenerator from '@/blockly/generators/skript'
import { pt, t } from '@/locales/i18n'
import { createTempFieldDropdownBuilder, createFieldDropdownBuilder, GameModes, Entities, EquipmentSlots } from '@/blockly/blocks/types/Types'

export type EasyEventConfig = {
  fields: (() => Blockly.Field)[]
  codeTemplate: (string | number | { index: number; default?: string; prefix?: string; suffix?: string })[]
}

export const EasyEventConfigs: Record<string, EasyEventConfig> = {
  gamemode_change: {
    fields: [createFieldDropdownBuilder(GameModes, true)],
    codeTemplate: ['on gamemode change', { index: 0, prefix: 'to ' }],
  },
  server_startstop: {
    fields: [createTempFieldDropdownBuilder('event_server_startstop', ['start', 'stop'])],
    codeTemplate: ['on skript', 0],
  },
  // 存在 entity portal 划分成简单语法
  // portal: {
  //   fields: [buildMenuOption('event_portal', ['player', 'entity'])],
  //   codeTemplate: ['on', 0, 'portal'],
  // },
  target: {
    fields: [createTempFieldDropdownBuilder('event_target', ['target', 'untarget'])],
    codeTemplate: ['on', 0],
  },
  level_change: {
    fields: [createTempFieldDropdownBuilder('event_level_change', ['change', 'up', 'down'])],
    codeTemplate: ['on level', 0],
  },
  damage: {
    fields: [createFieldDropdownBuilder(Entities, true), createFieldDropdownBuilder(Entities, true)],
    codeTemplate: ['on damage', { index: 0, prefix: 'of ' }, { index: 1, prefix: 'by ' }],
  },
  experience_change: {
    fields: [createTempFieldDropdownBuilder('event_experience_change', ['change', 'increase', 'decrease'])],
    codeTemplate: ['on experience', 0],
  },
  beacon_toggle: {
    fields: [createTempFieldDropdownBuilder('event_beacon_toggle', ['toggle', 'activate', 'deactivate'])],
    codeTemplate: ['on beacon', 0],
  },
  armor_change: {
    fields: [createFieldDropdownBuilder(EquipmentSlots, true)],
    codeTemplate: ['on', { index: 0, default: 'armor' }, 'change'],
  },
} as const

export const EasyEvents = Object.keys(EasyEventConfigs)
export type EasyEvent = (typeof EasyEvents)[number]

export function registerEasyEvent(key: EasyEvent, syntax: EventSyntax): Blockly.utils.toolbox.BlockInfo {
  const blockKey = generateEventBlockKey(syntax)
  const definition = createEventDefinition(syntax)
  const config = EasyEventConfigs[key]!

  const mixin = {
    initShape_(this: SkriptEventBlock) {
      const msg = t(this.generateDescriptionLangKey_())
      const prase = pt(msg)

      const input = this.appendDummyInput()
      prase.forEach((segment) => {
        if (typeof segment === 'number') {
          const fieldConfig = config.fields[segment]
          if (fieldConfig) {
            input.appendField(fieldConfig(), `field-${segment}`)
          }
        } else if (typeof segment === 'string') {
          input.appendField(segment)
        }
      })
    },
    generateEventCode_(this: SkriptEventBlock) {
      return config.codeTemplate
        .map((segment) => {
          if (typeof segment === 'string') {
            return segment
          } else if (typeof segment === 'number') {
            return `${this.getFieldValue('field-' + segment) ?? ''}`
          } else {
            const field = this.getFieldValue(`field-${segment.index}`)
            if (field && field != '') {
              return `${segment.prefix ?? ''}${this.getFieldValue('field-' + segment.index)}${segment.suffix ?? ''}`
            }
            return segment.default ?? field
          }
        })
        .filter((s) => s?.trim())
        .join(' ')
    },
  }

  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = createEventCodeGenerator()
  return { kind: 'block', type: blockKey }
}
