import { Filter } from '../filter'
import { Class } from '../objects'
import { Search } from '../search'

/**
 * Creates an LDAP search that constraints the given {@link Filter} to only
 * match school classes.
 *
 * @param filter the filter to apply to the search query
 * @returns the created {@link Search}
 */
export const classes = (filter: Filter<Class>): Search<Class> => {
  return {
    baseDN:
      'OU=Klassen,OU=Mailaktivierte Sicherheitsgruppen,OU=Gruppen,OU=SPG,DC=htl-wien5,DC=schule',
    filter: {
      and: [
        {
          compare: ['objectClass', '=', 'group']
        },
        filter
      ]
    }
  }
}
