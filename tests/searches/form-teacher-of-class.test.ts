import { formTeacherOfClass } from '../../lib/searches/form-teacher-of-class'
import { buildFilter } from '../../lib/filter'
import { Search } from '../../lib/search'
import { User } from '../../lib'
import { describe, expect, it } from 'vitest'

describe('create form-teacher search', () => {
  const schoolClass = '4BHIF'
  const group = `CN=KV_${schoolClass},OU=KV,OU=Mailaktivierte Sicherheitsgruppen,OU=Gruppen,OU=SPG,DC=htl-wien5,DC=schule`

  it('should create a correct filter', () => {
    const search = formTeacherOfClass(schoolClass)

    expect(search).toEqual({
      filter: {
        and: [
          {
            compare: ['objectClass', '=', 'person']
          },
          {
            compare: ['objectClass', '=', 'user']
          },
          {
            compare: ['memberOf', '=', group]
          }
        ]
      }
    } as Search<User>)
  })

  it('should create a correct LDAP filter string', () => {
    const { filter } = formTeacherOfClass(schoolClass)

    const filterString = buildFilter(filter)

    expect(filterString).toEqual(
      `(&(objectClass=person)(objectClass=user)(memberOf=${group}))`
    )
  })
})
