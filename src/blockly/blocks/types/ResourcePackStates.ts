import type { SkriptType } from './Types'

export const ResourcePackStates: SkriptType = {
  name: 'resource_pack_state',
  options: ['accepted', 'declined', 'failed download', 'successfully loaded', 'downloaded', 'invalid url', 'failed reload', 'discarded'],
}
