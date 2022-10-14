import { Filter } from '../filter'
import { User } from '../objects'

/**
 * Creates an LDAP filter that matches all users that are students of the given
 * school class.
 *
 * @param schoolClass the abbreviation of the school class
 * @returns the created {@link Filter}
 */
export const studentsOfClass = (schoolClass: string): Filter<User> => {
  const group = `CN=${schoolClass},OU=Klassen,OU=Mailaktivierte Sicherheitsgruppen,OU=Gruppen,OU=SPG,DC=htl-wien5,DC=schule`

  return {
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
