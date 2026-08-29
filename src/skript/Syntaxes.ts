type SyntaxOrigin = {
  name: string
  class?: string
  modules?: string[]
}

type NamedRef = {
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

type ExperimentData = {
  required: NamedRef[]
  disallowed: NamedRef[]
}

type ExpressionSyntax = Syntax & {
  patterns: string[]
  returnType: NamedRef
  events?: NamedRef[]
  experimentData?: ExperimentData
  relatedProperty?: NamedRef
}

type ConditionSyntax = Syntax & {
  patterns: string[]
  events?: NamedRef[]
  experimentData?: ExperimentData
  relatedProperty?: NamedRef
}

type EventValue = {
  type: NamedRef
  plural: boolean
  time: 'PAST' | 'NOW' | 'FUTURE'
  patterns: string[]
  supportedChangeModes: string[]
}

type EventSyntax = Syntax & {
  patterns: string[]
  cancellable: boolean
  eventValues: EventValue[]
}

type EffectSyntax = Syntax & {
  patterns: string[]
  events?: NamedRef[]
  experimentData?: ExperimentData
}

type SectionSyntax = Syntax & {
  patterns: string[]
}

type StructureEntry = {
  key: string
  optional: boolean
  multiple: boolean
}

type StructureSyntax = Syntax & {
  patterns: string[]
  nodeType: 'SECTION' | 'BOTH' | 'SIMPLE'
  entries?: Record<string, StructureEntry>
}

type NameForms = {
  singular: string
  plural: string
}

type TypeSyntax = Syntax & {
  usage?: string[]
  codename?: NameForms
  properties?: Array<{
    property: NamedRef
    origin: SyntaxOrigin
    description: string
  }>
}

type ExperimentSyntax = Syntax & {
  phase: 'STABLE' | 'EXPERIMENTAL' | 'MAINSTREAM'
  pattern: string
}

type FunctionParameter = {
  name: string
  type: NamedRef
  plural: boolean
  modifiers?: {
    optional?: boolean
    ranged?: {
      min: string
      max: string
    }
  }
}

type FunctionSyntax = Syntax & {
  returnType: NamedRef
  parameters?: Record<string, FunctionParameter>
}

type PropertySyntax = Syntax & {
  types: NamedRef[]
  syntaxes: NamedRef[]
}

type EntityDataSyntax = Syntax & {
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
  expressions: Record<string, ExpressionSyntax>
  effects: Record<string, EffectSyntax>
  sections: Record<string, SectionSyntax>
  events: Record<string, EventSyntax>
  conditions: Record<string, ConditionSyntax>
  structures: Record<string, StructureSyntax>
  types: Record<string, TypeSyntax>
  experiments: Record<string, ExperimentSyntax>
  functions: Record<string, FunctionSyntax>
  properties: Record<string, PropertySyntax>
  entitydatas: Record<string, EntityDataSyntax>
}

const syntaxesData = await import('../assets/syntaxes.json').then((res) => res.default as Syntaxes)

export const { version, source, expressions, effects, sections, events, conditions, structures, types, experiments, functions, properties, entitydatas: entityData } = syntaxesData

export type {
  SyntaxOrigin,
  NamedRef,
  Syntax,
  ExperimentData,
  ExpressionSyntax,
  ConditionSyntax,
  EventValue,
  EventSyntax,
  EffectSyntax,
  SectionSyntax,
  StructureEntry,
  StructureSyntax,
  NameForms,
  TypeSyntax,
  ExperimentSyntax,
  FunctionParameter,
  FunctionSyntax,
  PropertySyntax,
  EntityDataSyntax,
  Syntaxes,
}

export default syntaxesData
