const Configuration = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^(?<type>.*\s\w*)(?:\((?<scope>.*)\))?!?:\s(?<subject>(?:(?!#).)*(?:(?!\s).))$/,
      headerCorrespondence: ['type', 'scope', 'subject']
    }
  },
  // 自定校验规则
  rules: {
    // 0:禁用规则，1:警告，2:错误
    'type-enum': [
      2,
      'always',
      [
        '✨ feat',
        '🐛 fix',
        '🎉 init',
        '📝 docs',
        '🔧 config',
        '💄 style',
        '🎨 format',
        '♻️ refactor',
        '⚡️ perf',
        '✅ test',
        '📦️ build',
        '👷 ci',
        '🔨 chore',
        '⏪️ revert',
        '🔥 delete'
      ]
    ]
  }
}

module.exports = Configuration
