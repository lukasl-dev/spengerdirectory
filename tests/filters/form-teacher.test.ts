import { formTeacher } from '../../lib/filters/form-teacher'
import { buildFilter } from '../../lib/filter'
import { describe, expect, it } from 'vitest'

describe('create form-teacher filter', () => {
  const schoolClass = '4BHIF'
  const group = `CN=KV_${schoolClass},OU=KV,OU=Mailaktivierte Sicherheitsgruppen,OU=Gruppen,OU=SPG,DC=htl-wien5,DC=schule`

  it('should create a correct filter', () => {
    const filter = formTeacher(schoolClass)

    expect(filter).toEqual({
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
    })
  })

  it('should create a correct LDAP filter string', () => {
    const filterString = buildFilter(formTeacher(schoolClass))

    expect(filterString).toEqual(
      `(&(objectClass=person)(objectClass=user)(memberOf=${group}))`
    )
  })
})
