import { studentsOfClass } from '../../lib/filters/students-of-class'
import { buildFilter } from '../../lib/filter'
import { describe, expect, it } from 'vitest'

describe('create form students-of-class filter', () => {
  const schoolClass = '4BHIF'
  const group = `CN=${schoolClass},OU=Klassen,OU=Mailaktivierte Sicherheitsgruppen,OU=Gruppen,OU=SPG,DC=htl-wien5,DC=schule`

  it('should create a correct filter', () => {
    const filter = studentsOfClass(schoolClass)

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
    const filterString = buildFilter(studentsOfClass(schoolClass))

    expect(filterString).toEqual(
      `(&(objectClass=person)(objectClass=user)(memberOf=${group}))`
    )
  })
})
