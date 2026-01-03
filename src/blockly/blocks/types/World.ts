import FieldDefaultTextInput from '@/blockly/inputs/FieldDefaultTextInput'
import { SimpleMutator } from '@/blockly/utils/SimpleMutator'
import { t } from '@/locales/i18n'

export class WorldMutator extends SimpleMutator<string> {
  constructor() {
    super({ topBlockId: 'skript_type_world_mutator_top_block', topBlockDesc: 'SKRIPT_TYPE_WORLD_MUTATOR_TOP_BLOCK_DESC', fieldName: 'world' })
    this.registerInputPresetBlock('skript_type_world_mutator_default', 'SKRIPT_TYPE_WORLD', () => new FieldDefaultTextInput(t('SKRIPT_TYPE_WORLD_NAME', '')))
    this.registerPresetBlock('skript_type_world_mutator_main_world', 'SKRIPT_TYPE_WORLD_MAIN_WORLD', 'world')
    this.registerPresetBlock('skript_type_world_mutator_nether_world', 'SKRIPT_TYPE_WORLD_NETHER_WORLD', 'world_nether')
    this.registerPresetBlock('skript_type_world_mutator_theend_world', 'SKRIPT_TYPE_WORLD_THEEND_WORLD', 'world_the_end')
  }
}

const defaultWorldMutator = new WorldMutator()
export default defaultWorldMutator
