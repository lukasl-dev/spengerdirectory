export type Filter<F extends object> =
  | { and: Filter<F>[] }
  | { or: Filter<F>[] }
  | { not: Filter<F>[] }
  | { compare: [keyof F, '=' | '<' | '<=' | '>' | '=>', string] }

/**
 * Builds an LDAp filter string from the given filter object.
 *
 * @param query the filter object
 * @returns the LDAP filter string
 */
export const buildFilter = <F extends object>(query: Filter<F>): string => {
  if ('and' in query) {
    return `(&${query.and.map(buildFilter).join('')})`
  }

  if ('or' in query) {
    return `(|${query.or.map(buildFilter).join('')})`
  }

  if ('not' in query) {
    return `(!${query.not.map(buildFilter).join('')})`
  }

  if ('compare' in query) {
    const [key, operator, value] = query.compare

    return `(${String(key)}${operator}${value})`
  }

  return ''
}
