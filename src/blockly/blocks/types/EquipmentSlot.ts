import { SimpleMutator } from '@/blockly/utils/SimpleMutator'
import { t } from '@/locales/i18n'
import * as Blockly from 'blockly/core'

export function createEquipmentSlotArmorFieldDropdown() {
  return new Blockly.FieldDropdown([
    [t('SKRIPT_EQUIPMENT_SLOT_DEFAULT'), ''],
    [t('SKRIPT_EQUIPMENT_SLOT_HELMET'), 'helmet'],
    [t('SKRIPT_EQUIPMENT_SLOT_CHESTPLATE'), 'chestplate'],
    [t('SKRIPT_EQUIPMENT_SLOT_LEGGINGS'), 'leggings'],
    [t('SKRIPT_EQUIPMENT_SLOT_BOOTS'), 'boots'],
  ])
}

export class EquipmentSlotMutator extends SimpleMutator<string> {
  constructor() {
    super({ topBlockId: 'skript_type_equipment_slot_top_block', topBlockDesc: 'SKRIPT_TYPE_WORLD_MUTATOR_TOP_BLOCK_DESC', fieldName: 'slot', multiple: false })
    this.registerPresetBlock('skript_type_equipment_mutator_slot_main_hand', 'SKRIPT_EQUIPMENT_SLOT_MAIN_HAND', 'main hand')
    this.registerPresetBlock('skript_type_equipment_mutator_slot_off_hand', 'SKRIPT_EQUIPMENT_SLOT_OFF_HAND', 'off hand')
    this.registerPresetBlock('skript_type_equipment_mutator_slot_headmt', 'SKRIPT_EQUIPMENT_SLOT_HELMET', 'helmet')
    this.registerPresetBlock('skript_type_equipment_mutator_slot_chestplate', 'SKRIPT_EQUIPMENT_SLOT_CHESTPLATE', 'chestplate')
    this.registerPresetBlock('skript_type_equipment_mutator_slot_leggings', 'SKRIPT_EQUIPMENT_SLOT_LEGGINGS', 'leggings')
    this.registerPresetBlock('skript_type_equipment_mutator_slot_boots', 'SKRIPT_EQUIPMENT_SLOT_BOOTS', 'boots')
    this.registerPresetBlock('skript_type_equipment_mutator_slot_body', 'SKRIPT_EQUIPMENT_SLOT_BODY', 'body')
    this.registerPresetBlock('skript_type_equipment_mutator_slot_saddle', 'SKRIPT_EQUIPMENT_SLOT_SADDLE', 'saddle')
  }

  createArmorMutator(block: Blockly.BlockSvg) {
    return new Blockly.icons.MutatorIcon(
      [
        'skript_type_equipment_mutator_slot_headmt',
        'skript_type_equipment_mutator_slot_chestplate',
        'skript_type_equipment_mutator_slot_leggings',
        'skript_type_equipment_mutator_slot_boots',
      ],
      block,
    )
  }

  getEquipmentSlotDesc(id: string) {
    return this.presets.find((e) => e.id == id)!.desc
  }
}

const defaultEquipmentSlotMutator = new EquipmentSlotMutator()
export default defaultEquipmentSlotMutator
