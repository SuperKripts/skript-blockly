import * as Blockly from 'blockly/core'
import { register as register_AttributeTypes } from './AttributeTypes.ts'
import { register as register_BannerPatternTypes } from './BannerPatternTypes.ts'
import { registerAll as registerAll_BasicTypes } from './BasicTypes.ts'
import { register as register_Biomes } from './Biomes.ts'
import { register as register_BooleanType } from './BooleanType.ts'
import { register as register_CatTypes } from './CatTypes.ts'
import { register as register_ChangeReasons } from './ChangeReasons.ts'
import { register as register_Chat } from './Chat.ts'
import { register as register_ChickenVariants } from './ChickenVariants.ts'
import { register as register_CowVariants } from './CowVariants.ts'
import { register as register_DamageCauses } from './DamageCauses.ts'
import { register as register_DamageTypes } from './DamageTypes.ts'
import { register as register_Difficulties } from './Difficulties.ts'
import { register as register_Directions } from './Directions.ts'
import { register as register_DisplayBillboards } from './DisplayBillboards.ts'
import { register as register_Enchantments } from './Enchantments.ts'
import { register as register_Entities } from './Entities.ts'
import { register as register_EntityEffects } from './EntityEffects.ts'
import { register as register_EntityPotionCauses } from './EntityPotionCauses.ts'
import { register as register_Environments } from './Environments.ts'
import { register as register_EquipmentSlots } from './EquipmentSlots.ts'
import { register as register_Fireworktypes } from './Fireworktypes.ts'
import { register as register_FishingStates } from './FishingStates.ts'
import { register as register_FrogVariants } from './FrogVariants.ts'
import { register as register_GameEffects } from './GameEffects.ts'
import { register as register_GameModes } from './GameModes.ts'
import { register as register_HealReasons } from './HealReasons.ts'
import { register as register_InputKeys } from './InputKeys.ts'
import { register as register_InventoryActions } from './InventoryActions.ts'
import { register as register_InventoryClickTypes } from './InventoryClickTypes.ts'
import { register as register_InventoryCloseReasons } from './InventoryCloseReasons.ts'
import { register as register_InventoryTypes } from './InventoryTypes.ts'
import { register as register_ItemDisplayTransforms } from './ItemDisplayTransforms.ts'
import { register as register_ItemFlags } from './ItemFlags.ts'
import { register as register_Materials } from './Materials.ts'
import { register as register_MoonPhases } from './MoonPhases.ts'
import { registerAll as registerAll_Other } from './Other.ts'
import { register as register_PandaGenes } from './PandaGenes.ts'
import { register as register_ParticleEffects } from './ParticleEffects.ts'
import { register as register_PigVariants } from './PigVariants.ts'
import { register as register_PotionActions } from './PotionActions.ts'
import { register as register_PotionEffectTypes } from './PotionEffectTypes.ts'
import { register as register_QuitReasons } from './QuitReasons.ts'
import { register as register_ResourcePackStates } from './ResourcePackStates.ts'
import { register as register_RespawnReasons } from './RespawnReasons.ts'
import { register as register_SoundCategories } from './SoundCategories.ts'
import { register as register_SpawnReasons } from './SpawnReasons.ts'
import { register as register_TeleportCauses } from './TeleportCauses.ts'
import { register as register_TeleportFlags } from './TeleportFlags.ts'
import { register as register_TextDisplayAlignments } from './TextDisplayAlignments.ts'
import { register as register_Timespan } from './Timespan.ts'
import { register as register_TransformReasons } from './TransformReasons.ts'
import { register as register_TreeTypes } from './TreeTypes.ts'
import { register as register_UnleashReasons } from './UnleashReasons.ts'
import { register as register_VillagerCareerChangeReasons } from './VillagerCareerChangeReasons.ts'
import { register as register_VillagerProfessions } from './VillagerProfessions.ts'
import { register as register_VillagerTypes } from './VillagerTypes.ts'
import { register as register_Weather } from './Weather.ts'
import { register as register_WolfVariants } from './WolfVariants.ts'
import { register as register_ZombieNautilusVariants } from './ZombieNautilusVariants.ts'

export const BlockInfos: Blockly.utils.toolbox.BlockInfo[] = []

function register() {
  BlockInfos.push(
    register_AttributeTypes(),
    register_BannerPatternTypes(),
    ...registerAll_BasicTypes(),
    register_Biomes(),
    register_BooleanType(),
    register_CatTypes(),
    register_ChangeReasons(),
    register_Chat(),
    register_ChickenVariants(),
    register_CowVariants(),
    register_DamageCauses(),
    register_DamageTypes(),
    register_Difficulties(),
    register_Directions(),
    register_DisplayBillboards(),
    register_Enchantments(),
    register_Entities(),
    register_EntityEffects(),
    register_EntityPotionCauses(),
    register_Environments(),
    register_EquipmentSlots(),
    register_Fireworktypes(),
    register_FishingStates(),
    register_FrogVariants(),
    register_GameEffects(),
    register_GameModes(),
    register_HealReasons(),
    register_InputKeys(),
    register_InventoryActions(),
    register_InventoryClickTypes(),
    register_InventoryCloseReasons(),
    register_InventoryTypes(),
    register_ItemDisplayTransforms(),
    register_ItemFlags(),
    register_Materials(),
    register_MoonPhases(),
    ...registerAll_Other(),
    register_PandaGenes(),
    register_ParticleEffects(),
    register_PigVariants(),
    register_PotionActions(),
    register_PotionEffectTypes(),
    register_QuitReasons(),
    register_ResourcePackStates(),
    register_RespawnReasons(),
    register_SoundCategories(),
    register_SpawnReasons(),
    register_TeleportCauses(),
    register_TeleportFlags(),
    register_TextDisplayAlignments(),
    register_Timespan(),
    register_TransformReasons(),
    register_TreeTypes(),
    register_UnleashReasons(),
    register_VillagerCareerChangeReasons(),
    register_VillagerProfessions(),
    register_VillagerTypes(),
    register_Weather(),
    register_WolfVariants(),
    register_ZombieNautilusVariants(),
  )
}

register()
