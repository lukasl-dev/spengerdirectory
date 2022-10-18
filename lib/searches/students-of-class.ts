import { User } from '../objects'
import { Search } from '../search'

/**
 * Creates an LDAP search that matches all users that are students of the given
 * school class.
 *
 * @param schoolClass the abbreviation of the school class
 * @returns the created {@link Search}
 */
export const studentsOfClass = (schoolClass: string): Search<User> => {
  const group = `CN=${schoolClass},OU=Klassen,OU=Mailaktivierte Sicherheitsgruppen,OU=Gruppen,OU=SPG,DC=htl-wien5,DC=schule`

  return {
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
  }
}
