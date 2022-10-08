export interface SearchResult<E extends object> {
  /**
   * The search references returned by the server.
   */
  references: string[]

  /**
   * The search entries returned by the server.
   */
  entries: E[]
}
