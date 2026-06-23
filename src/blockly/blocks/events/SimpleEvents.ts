'skript syntax'

import * as Blockly from 'blockly/core'

type SimpleEventInfo =
  | {
      name: string
      code: string
    }
  | string

const SimpleEventInfos: SimpleEventInfo[] = [
  'can build check',
  'block damage',
  'flow',
  'ignition',
  'physics',
  'piston extend',
  'piston retract',
  'redstone',
  'spread',
  'chunk load',
  'chunk generate',
  'chunk unload',
  'creeper power',
  'zombie break door',
  'combust',
  'explode',
  'portal enter',
  'tame',
  'explosion prime',
  'hunger meter change',
  'leaves decay',
  'lightning strike',
  'pig zap',
  'bed enter',
  'bed leave',
  'bucket empty',
  'bucket fill',
  'egg throw',
  'item break', // 不支持直接使用名称的事件（对象形式）
  'item damage',
  'tool change',
  'join',
  'connect',
  'kick',
  'quit',
  'respawn',
  'sneak toggle',
  'sprint toggle',
  'portal create',
  'projectile hit',
  'projectile collide',
  'shoot',
  'sign change',
  'spawn change',
  'vehicle create',
  'vehicle damage',
  'vehicle destroy',
  'vehicle enter',
  'vehicle exit',
  'entity mount', //
  'entity dismount', //
  'gliding state change',
  'aoe cloud effect', //
  'sheep regrow wool',
  'inventory open',
  'inventory close',
  'slime split',
  'resurrect attempt',
  'player world change',
  'flight toggle',
  'language change',
  'jump',
  'hand item swap', //
  'server list ping',
  'swim toggle',
  'riptide',
  'sponge absorb',
  'enchant prepare',
  'enchant',
  'inventory pickup',
  'horse jump',
  'block fertilize',
  'arm swing',
  'item mend',
  'anvil prepare',
  'player trade',
  'entity jump',
  'anvil damage',
  'stop using item',
  'ready arrow',
  'inventory slot change',
  'player deep sleep',
  'player pickup arrow',
  'inventory drag',
  'piglin barter',
  'bell ring',
  'bell resonate',
  'enderman enrage',
  'beacon change effect',
  'broadcast',
  'experience cooldown change',
  'vehicle move',
  'elytra boost',
  'bat toggle sleep',
  'world border bounds change',
  'world border bounds finish change',
  'world border center change',
  'vault display item',
  'villager career change',
]
export function registerAll(): Blockly.utils.toolbox.BlockInfo[] {
  SimpleEventInfos.forEach((info) => {
    let a = {}
    if (typeof info === 'string') {
      a = { name: info, code: info }
    } else {
      a = { name: info.name, code: info.code }
    }
    console.log(a)
  })
  return []
}
