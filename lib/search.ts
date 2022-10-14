import { Filter } from './filter'

export interface Search<E extends object> {
  /**
   * The base DN to use for the search. Overrides the client's default base DN.
   */
  baseDN?: string

  /**
   * The filter to use for the search.
   */
  filter: Filter<E>
}
