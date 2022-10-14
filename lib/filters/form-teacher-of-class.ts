import { User } from '../objects'
import { Filter } from '../filter'

/**
 * Creates an LDAP filter that matches all users that are form teachers of the
 * given school class.
 *
 * @param schoolClass the abbreviation of the school class
 * @returns the created {@link Filter}
 */
export const formTeacherOfClass = (schoolClass: string): Filter<User> => {
  const group = `CN=KV_${schoolClass},OU=KV,OU=Mailaktivierte Sicherheitsgruppen,OU=Gruppen,OU=SPG,DC=htl-wien5,DC=schule`

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
