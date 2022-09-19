import {
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  xssToString
} from '@/utils/string.util'

describe('string工具类:单元测试', () => {
  it('toSnakeCase测试', () => {
    expect(toSnakeCase('userRelation')).toBe('user-relation')
    expect(toSnakeCase('UserRelation')).toBe('user-relation')
  })

  it('toPascalCase测试', () => {
    expect(toPascalCase('user-relation')).toBe('UserRelation')
    expect(toPascalCase('userRelation')).toBe('UserRelation')
  })

  it('toCamelCase测试', () => {
    expect(toCamelCase('user-relation')).toBe('userRelation')
    expect(toCamelCase('UserRelation')).toBe('userRelation')
  })

  it('xssToString测试', () => {
    expect(
      xssToString([
        `<script type="text/javascript">
alert(/xss/);
</script>`,
        'yiminfe'
      ])
    ).toEqual([
      `&lt;script type="text/javascript"&gt;
alert(/xss/);
&lt;/script&gt;`,
      'yiminfe'
    ])

    expect(
      xssToString(`<script type="text/javascript">
alert(/xss/);
</script>`)
    ).toBe(`&lt;script type="text/javascript"&gt;
alert(/xss/);
&lt;/script&gt;`)

    expect(
      xssToString({
        title: 'yiminfe',
        content: `<script type="text/javascript">
alert(/xss/);
</script>`
      })
    ).toEqual({
      title: 'yiminfe',
      content: `&lt;script type="text/javascript"&gt;
alert(/xss/);
&lt;/script&gt;`
    })
  })
})
