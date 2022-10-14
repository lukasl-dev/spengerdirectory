import { studentsOfClass } from '../../lib/searches/students-of-class'
import { buildFilter } from '../../lib/filter'
import { Search } from '../../lib/search'
import { User } from '../../lib'
import { describe, expect, it } from 'vitest'

describe('create form students-of-class search', () => {
  const schoolClass = '4BHIF'
  const group = `CN=${schoolClass},OU=Klassen,OU=Mailaktivierte Sicherheitsgruppen,OU=Gruppen,OU=SPG,DC=htl-wien5,DC=schule`

  it('should create a correct filter', () => {
    const search = studentsOfClass(schoolClass)

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
    const { filter } = studentsOfClass(schoolClass)

    const filterString = buildFilter(filter)

    expect(filterString).toEqual(
      `(&(objectClass=person)(objectClass=user)(memberOf=${group}))`
    )
  })
})
