import { generator, Order, SkriptCodeGenerator } from '@/blockly/generators/skript'

generator.forBlock['variables_get'] = function (block, generator) {
  const code = generator.getVariableName(block.getFieldValue('VAR'))
  return [`{_${code}}`, Order.ATOMIC]
}

generator.forBlock['variables_set'] = function (block, generator) {
  const varName = generator.getVariableName(block.getFieldValue('VAR'))
  const argument = generator.valueToCode(block, 'VALUE', Order.ATOMIC) || '{_null}'
  return SkriptCodeGenerator.codeJoin('set', `{${varName}}`, 'to', argument)
}
