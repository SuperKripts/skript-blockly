import type { SkriptType } from './Types'

export const Verbosity: SkriptType = {
  name: 'verbosity',
  type: 'object',
  options: ['low', 'normal', 'high', 'very high', 'debug'],
}
