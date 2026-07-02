import type { SkriptType } from './Types'

export const InventoryCloseReasons: SkriptType = {
  name: 'inventory_close_reason',
  options: ['unknown', 'teleport', 'cant use', 'unloaded', 'open new', 'player', 'disconnect', 'death', 'plugin'],
}
