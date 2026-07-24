'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const EquipmentSlots: SkriptType = {
  name: 'equipment_slot',
  type: 'equipmentslot',
  options: ['head', 'chest', 'legs', 'feet', 'hand', 'off hand', 'body', 'saddle'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(EquipmentSlots, 'EquipmentSlots', 9786)
}