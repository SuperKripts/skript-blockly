import * as Blockly from 'blockly/core'
import { register as register_AttemptAttack } from './AttemptAttack.ts'
import { register as register_AtTime } from './AtTime.ts'
import { register as register_BeaconEffect } from './BeaconEffect.ts'
import { register as register_BeaconToggle } from './BeaconToggle.ts'
import { registerAll as registerAll_Block } from './Block.ts'
import { register as register_BookEdit } from './BookEdit.ts'
import { register as register_BookSign } from './BookSign.ts'
import { register as register_Click } from './Click.ts'
import { register as register_Command } from './Command.ts'
import { register as register_Damage } from './Damage.ts'
import { registerAll as registerAll_Entity } from './Entity.ts'
import { registerAll as registerAll_EntityBlockChange } from './EntityBlockChange.ts'
import { register as register_EntityShootBow } from './EntityShootBow.ts'
import { register as register_EntityTarget } from './EntityTarget.ts'
import { register as register_EntityTransform } from './EntityTransform.ts'
import { register as register_ExperienceChange } from './ExperienceChange.ts'
import { register as register_ExperienceSpawn } from './ExperienceSpawn.ts'
import { register as register_FireworkExplode } from './FireworkExplode.ts'
import { register as register_FirstJoin } from './FirstJoin.ts'
import { register as register_GamemodeChange } from './GamemodeChange.ts'
import { register as register_HarvestBlock } from './HarvestBlock.ts'
import { register as register_Heal } from './Heal.ts'
import { registerAll as registerAll_Item } from './Item.ts'
import { register as register_Leash } from './Leash.ts'
import { register as register_LevelChange } from './LevelChange.ts'
import { register as register_Move } from './Move.ts'
import { register as register_MoveOn } from './MoveOn.ts'
import { register as register_PlantGrowth } from './PlantGrowth.ts'
import { register as register_PlayerArmorChange } from './PlayerArmorChange.ts'
import { register as register_PlayerChunkEnter } from './PlayerChunkEnter.ts'
import { register as register_PlayerCommandSend } from './PlayerCommandSend.ts'
import { register as register_Portal } from './Portal.ts'
import { register as register_PressurePlate } from './PressurePlate.ts'
import { register as register_RealTime } from './RealTime.ts'
import { register as register_ResourcePackResponse } from './ResourcePackResponse.ts'
import { register as register_Script } from './Script.ts'
import { registerAll as registerAll_SimpleEvents } from './SimpleEvents.ts'
import { register as register_Skript } from './Skript.ts'
import { register as register_Spectate } from './Spectate.ts'
import { register as register_Teleport } from './Teleport.ts'
import { register as register_VehicleCollision } from './VehicleCollision.ts'
import { register as register_WeatherChange } from './WeatherChange.ts'
import { registerAll as registerAll_World } from './World.ts'

export const BlockInfos: Blockly.utils.toolbox.BlockInfo[] = []

function register() {
  BlockInfos.push(
    register_AttemptAttack(),
    register_AtTime(),
    register_BeaconEffect(),
    register_BeaconToggle(),
    ...registerAll_Block(),
    register_BookEdit(),
    register_BookSign(),
    register_Click(),
    register_Command(),
    register_Damage(),
    ...registerAll_Entity(),
    ...registerAll_EntityBlockChange(),
    register_EntityShootBow(),
    register_EntityTarget(),
    register_EntityTransform(),
    register_ExperienceChange(),
    register_ExperienceSpawn(),
    register_FireworkExplode(),
    register_FirstJoin(),
    register_GamemodeChange(),
    register_HarvestBlock(),
    register_Heal(),
    ...registerAll_Item(),
    register_Leash(),
    register_LevelChange(),
    register_Move(),
    register_MoveOn(),
    register_PlantGrowth(),
    register_PlayerArmorChange(),
    register_PlayerChunkEnter(),
    register_PlayerCommandSend(),
    register_Portal(),
    register_PressurePlate(),
    register_RealTime(),
    register_ResourcePackResponse(),
    register_Script(),
    ...registerAll_SimpleEvents(),
    register_Skript(),
    register_Spectate(),
    register_Teleport(),
    register_VehicleCollision(),
    register_WeatherChange(),
    ...registerAll_World(),
  )
}

register()
