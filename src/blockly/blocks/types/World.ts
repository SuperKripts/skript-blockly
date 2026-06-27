import { SkriptCodeGenerator } from '@/blockly/generators/skript'
import FieldDefaultTextInput from '@/blockly/inputs/FieldDefaultTextInput'
import { SimpleMutator, type MutatorExtractValue } from '@/blockly/utils/SimpleMutator'
import { t } from '@/locales/i18n'

export class WorldMutator extends SimpleMutator<string> {
  constructor() {
    super({ topBlockId: 'skript_type_world_mutator_top_block', topBlockDesc: 'TYPE_WORLD_MUTATOR_TOP_BLOCK_DESC', fieldName: 'world' })
    this.registerInputPresetBlock('skript_type_world_mutator_default', 'TYPE_ENVIRONMENT_WORLD', () => new FieldDefaultTextInput('TYPE_ENVIRONMENT_CUSTOM'))
    this.registerPresetBlock('skript_type_world_mutator_main_world', 'TYPE_ENVIRONMENT_NORMAL', 'world')
    this.registerPresetBlock('skript_type_world_mutator_nether_world', 'TYPE_ENVIRONMENT_NETHER', 'world_nether')
    this.registerPresetBlock('skript_type_world_mutator_theend_world', 'TYPE_ENVIRONMENT_THE_END', 'world_the_end')
  }
}

export function worldName(world: string) {
  if (world === 'world') {
    return t('TYPE_ENVIRONMENT_NORMAL')
  } else if (world === 'world_nether') {
    return t('TYPE_ENVIRONMENT_NETHER')
  } else if (world === 'world_the_end') {
    return t('TYPE_ENVIRONMENT_THE_END')
  }
  return world
}

export function worldList(worlds: MutatorExtractValue<string>[]) {
  return SkriptCodeGenerator.arrayJoin(
    worlds.map((e) => e.value),
    true,
  )
}

const defaultWorldMutator = new WorldMutator()
export default defaultWorldMutator
