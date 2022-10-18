import { Filter } from '../filter'
import { User } from '../objects'
import { Search } from '../search'

/**
 * Creates an LDAP search that constraints the given {@link Filter} to only
 * match teachers.
 *
 * @param filter the filter to apply to the search query
 * @returns the created {@link Search}
 */
export const teachers = (filter: Filter<User>): Search<User> => {
  return {
    baseDN:
      'OU=Lehrer,OU=Automatisch gewartete Benutzer,OU=Benutzer,OU=SPG,DC=htl-wien5,DC=schule',
    filter: {
      and: [
        {
          compare: ['objectClass', '=', 'person']
        },
        {
          compare: ['objectClass', '=', 'user']
        },
        filter
      ]
    }
  }
}
