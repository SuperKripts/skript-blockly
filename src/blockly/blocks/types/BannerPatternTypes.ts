'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const BannerPatternTypes: SkriptType = {
  name: 'banner_pattern_type',
  type: 'bannerpatterntype',
  options: [
    'base',
    'border',
    'bricks',
    'circle',
    'creeper',
    'cross',
    'curly border',
    'diagonal left',
    'diagonal right',
    'diagonal up left',
    'diagonal up right',
    'flow',
    'flower',
    'globe',
    'gradient',
    'gradient up',
    'guster',
    'half horizontal',
    'half horizontal bottom',
    'half vertical',
    'half vertical right',
    'mojang',
    'piglin',
    'rhombus',
    'skull',
    'small stripes',
    'square bottom left',
    'square bottom right',
    'square top left',
    'square top right',
    'straight cross',
    'stripe bottom',
    'stripe center',
    'stripe downleft',
    'stripe downright',
    'stripe left',
    'stripe middle',
    'stripe right',
    'stripe top',
    'triangle bottom',
    'triangle top',
    'triangles bottom',
    'triangles top',
    'stripe small',
    'diagonal left mirror',
    'diagonal right mirror',
    'circle middle',
    'rhombus middle',
    'half vertical mirror',
    'half horizontal mirror',
  ],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(BannerPatternTypes, 'BannerPattern', 9783)
}