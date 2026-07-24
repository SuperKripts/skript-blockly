'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const PotionEffectTypes: SkriptType = {
  name: 'potion_effect_type',
  type: 'potioneffecttype',
  options: [
    'speed',
    'slowness',
    'haste',
    'mining fatigue',
    'strength',
    'instant health',
    'instant damage',
    'jump boost',
    'nausea',
    'regeneration',
    'resistance',
    'fire resistance',
    'water breathing',
    'invisibility',
    'blindness',
    'night vision',
    'hunger',
    'weakness',
    'poison',
    'wither',
    'health boost',
    'absorption',
    'saturation',
    'luck',
    'unluck',
    'levitation',
    'glowing',
    'slow falling',
    'dolphins grace',
    'conduit power',
    'bad omen',
    'hero of the village',
    'darkness',
    'wind charged',
    'raid omen',
    'infested',
    'weaving',
    'trial omen',
    'oozing',
    'breath of the nautilus',
  ],
}

export const PotionEffectTypeCategories: SkriptType = {
  name: 'potion_effect_type_category',
  type: 'potioneffecttypecategory',
  options: ['beneficial', 'harmful', 'neutral'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(PotionEffectTypes, 'PotionEffect', 0)
}