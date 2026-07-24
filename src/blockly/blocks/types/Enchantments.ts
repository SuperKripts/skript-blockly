'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const Enchantments: SkriptType = {
  name: 'enchantment',
  type: 'enchantment',
  options: [
    'protection',
    'fire protection',
    'feather falling',
    'blast protection',
    'projectile protection',
    'respiration',
    'aqua affinity',
    'sharpness',
    'smite',
    'bane of arthropods',
    'knockback',
    'fire aspect',
    'looting',
    'efficiency',
    'silk touch',
    'unbreaking',
    'fortune',
    'power',
    'punch',
    'flame',
    'infinity',
    'thorns',
    'luck of the sea',
    'lure',
    'depth strider',
    'mending',
    'frost walker',
    'curse of vanishing',
    'curse of binding',
    'sweeping edge',
    'channeling',
    'riptide',
    'impaling',
    'loyalty',
    'multishot',
    'piercing',
    'quick charge',
    'soul speed',
    'swift sneak',
    'density',
    'breach',
    'wind burst',
    'lunge',
  ],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(Enchantments, 'Enchantments', 2143)
}