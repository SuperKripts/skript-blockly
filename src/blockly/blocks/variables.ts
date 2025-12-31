import * as SkriptGenerator from '@/blockly/generators/skript'

SkriptGenerator.generator.forBlock['variables_get'] = function (block, generator) {
  const code = generator.getVariableName(block.getFieldValue('VAR'))
  return [`{_${code}}`, SkriptGenerator.Order.ATOMIC]
}

SkriptGenerator.generator.forBlock['variables_set'] = function (block, generator) {
  const varName = generator.getVariableName(block.getFieldValue('VAR'))
  const argument = generator.valueToCode(block, 'VALUE', SkriptGenerator.Order.ATOMIC) || '{_null}'
  return SkriptGenerator.codeJoin('set', `{${varName}}`, 'to', argument)
}
