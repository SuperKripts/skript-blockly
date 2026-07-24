'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const DamageCauses: SkriptType = {
  name: 'damage_cause',
  type: 'damagecause',
  options: [
    'contact',
    'entity attack',
    'entity sweep attack',
    'projectile',
    'suffocation',
    'fall',
    'fire',
    'fire tick',
    'melting',
    'lava',
    'drowning',
    'block explosion',
    'entity explosion',
    'void',
    'lightning',
    'starvation',
    'poison',
    'magic',
    'wither',
    'falling block',
    'suicide',
    'thorns',
    'dragon breath',
    'fly into wall',
    'hot floor',
    'cramming',
    'freeze',
    'dryout',
    'custom',
    'sonic boom',
    'kill',
    'world border',
    'campfire',
  ],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(DamageCauses, 'DamageCauses', 0)
}