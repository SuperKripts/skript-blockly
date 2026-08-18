type SyntaxOrigin = {
  name: string
  class?: string
  modules?: string[]
}

type TypeInfo = {
  id: string
  name: string
}

type EventRef = {
  id: string
  name: string
}

type Syntax = {
  origin: SyntaxOrigin
  id: string
  name: string
  description: string
  examples: string[]
  since: string[]
  requirements: string[]
  keywords: string[]
  deprecated: boolean
}

type Expression = Syntax & {
  patterns: string[]
  returnType?: TypeInfo
  events?: EventRef[]
  experimentData?: Record<string, unknown>
  relatedProperty?: Record<string, unknown>
}

type Condition = Syntax & {
  patterns: string[]
  events?: EventRef[]
  experimentData?: Record<string, unknown>
  relatedProperty?: Record<string, unknown>
}

type EventValue = {
  type: TypeInfo
  plural: boolean
  time: 'NOW'
  patterns: string[]
  supportedChangeModes: string[]
}

type SkriptEvent = Syntax & {
  patterns: string[]
  cancellable: boolean
  eventValues: EventValue[]
}

type Effect = Syntax & {
  patterns: string[]
  events?: EventRef[]
  experimentData?: Record<string, unknown>
}

type Section = Syntax & {
  patterns: string[]
}

type Structure = Syntax & {
  patterns: string[]
  nodeType: string
  entries?: Record<string, unknown>
}

type Codename = {
  singular: string
  plural: string
}

type TypeDefinition = Syntax & {
  usage?: string[]
  codename?: Codename
  properties?: unknown[]
}

type Experiment = Syntax & {
  phase: string
  pattern: string
}

type FunctionParameter = {
  name: string
  type: TypeInfo
  plural: boolean
}

type FunctionDefinition = Syntax & {
  returnType?: TypeInfo
  parameters?: Record<string, FunctionParameter>
}

type Property = Syntax & {
  types: TypeInfo[]
  syntaxes: EventRef[]
}

type EntityData = Syntax & {
  patterns: string[]
}

type Syntaxes = {
  version: {
    major: number
    minor: number
  }
  source: {
    name: string
    version: string
  }
  expressions: Record<string, Expression>
  effects: Record<string, Effect>
  sections: Record<string, Section>
  events: Record<string, SkriptEvent>
  conditions: Record<string, Condition>
  structures: Record<string, Structure>
  types: Record<string, TypeDefinition>
  experiments: Record<string, Experiment>
  functions: Record<string, FunctionDefinition>
  properties: Record<string, Property>
  entitydatas: Record<string, EntityData>
}

const syntaxesData = await import('@/assets/syntaxes.json').then((res) => res.default as Syntaxes)

export const { version, source, expressions, effects, sections, events, conditions, structures, types, experiments, functions, properties, entitydatas } = syntaxesData

export type {
  SyntaxOrigin,
  TypeInfo,
  EventRef,
  Syntax,
  Expression,
  Condition,
  EventValue,
  SkriptEvent,
  Effect,
  Section,
  Structure,
  TypeDefinition,
  Codename,
  Experiment,
  FunctionDefinition,
  FunctionParameter,
  Property,
  EntityData,
  Syntaxes,
}

export default syntaxesData
