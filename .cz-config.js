module.exports = {
  types: [
    { value: '✨ feat', name: '✨ feat:     添加新功能' },
    { value: '🐛 fix', name: '🐛 fix:      修复 bug' },
    {
      value: '🎉 init',
      name: '🎉 init:     初始化功能/业务'
    },
    {
      value: '📝 docs',
      name: '📝 docs:     添加/更新文档（不影响代码执行）'
    },
    { value: '🔧 config', name: '🔧 config:   添加/更新配置' },
    {
      value: '💄 style',
      name: '💄 style:    添加/更新样式文件'
    },
    {
      value: '🎨 format',
      name: '🎨 format:   代码格式更新（不影响代码执行）'
    },
    {
      value: '♻️ refactor',
      name: '♻️ refactor:  重构代码'
    },
    {
      value: '⚡️ perf',
      name: '⚡️ perf:     性能优化'
    },
    {
      value: '✅ test',
      name: '✅ test:     添加/更新/通过测试'
    },
    {
      value: '📦️ build',
      name: '📦️ build:    添加/更新编译打包'
    },
    {
      value: '👷 ci',
      name: '👷 ci:       添加/更新CI构建系统'
    },
    {
      value: '🔨 chore',
      name: '🔨 chore:    其它代码变更（非业务代码）'
    },
    { value: '⏪️ revert', name: '⏪️ revert:   代码回退' },
    {
      value: '🔥 delete',
      name: '🔥 delete:   删除代码/文件（不影响代码执行）'
    }
  ],
  scopes: [
    { name: 'empty                不填写', value: '' },
    { name: 'custom               自定义', value: 'custom' },
    { name: 'utils                工具类', value: 'utils' },
    { name: 'styles               样式相关', value: 'styles' },
    { name: 'deps                 项目依赖', value: 'deps' },
    { name: 'components           组件相关', value: 'components' },
    { name: 'hooks                hook 相关', value: 'hooks' },
    { name: 'other                其他修改', value: 'other' }
  ],

  messages: {
    type: '请选择一个修改类型',
    scope: '请选择一个修改范围',
    customScope: '请输入修改范围（可选）',
    subject: '请简单描述本次提交（必填）',
    body: '请输入详细的描述（可选）',
    confirmCommit: '确认提交吗？y（是）,n（中止）,e（修改)'
  },

  // 跳过要询问的步骤
  skipQuestions: ['body', 'breaking', 'footer'],

  // subject 限制长度
  subjectLimit: 100
}
