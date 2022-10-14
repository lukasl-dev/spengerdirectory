import { buildFilter, Filter } from './filter'
import { SearchResult } from './search-result'
import {
  Client as LDAPClient,
  ClientOptions as LDAPClientOptions
} from 'ldapts'

/**
 * The default LDAP client options.
 */
export const DEFAULT_CLIENT_OPTIONS: ClientOptions = {
  url: 'ldaps://ldap.spengergasse.at',
  tlsOptions: {
    requestCert: true,
    rejectUnauthorized: false
  },
  strictDN: true
}

/**
 * The default domain name for authentication.
 */
export const DEFAULT_DOMAIN = 'htl-wien5.schule'

/**
 * The default base DN for the search.
 */
export const DEFAULT_BASE_DN = 'dc=htl-wien5,dc=schule'

export type ClientOptions = LDAPClientOptions

export class Client {
  public readonly ldap: LDAPClient

  constructor(options: ClientOptions | LDAPClient = DEFAULT_CLIENT_OPTIONS) {
    if (options instanceof LDAPClient) {
      this.ldap = options
    } else {
      this.ldap = new LDAPClient(options)
    }
  }

  /**
   * Performs a bind operation against the LDAP server using the given credentials.
   *
   * @param username the username to use
   * @param password the password to use
   * @param domain the domain to use, defaults to {@link DEFAULT_DOMAIN}
   */
  public authenticate = async (
    username: string,
    password: string,
    domain: string = DEFAULT_DOMAIN
  ): Promise<void> => {
    await this.ldap.bind(`${username}@${domain}`, password)
  }

  /**
   * Used to indicate that the client wants to close the connection to the
   * server.
   */
  public close = async (): Promise<void> => {
    await this.ldap.unbind()
  }

  /**
   * Performs a search operation against the LDAP server using the given filter
   * string.
   *
   * @param filter the filter string
   * @param baseDN the base DN to use, defaults to {@link DEFAULT_BASE_DN}
   * @returns the {@link SearchResult}
   */
  public query = async <E extends object>(
    filter: string,
    baseDN: string = DEFAULT_BASE_DN
  ): Promise<SearchResult<E>> => {
    const result = await this.ldap.search(baseDN, { filter })

    return {
      references: result.searchReferences,
      entries: result.searchEntries as E[]
    }
  }

  /**
   * Performs a search operation against the LDAP server using the given filter.
   *
   * @param filter the filter to apply to the search query
   * @param baseDN the base DN to use, defaults to {@link DEFAULT_BASE_DN}
   * @returns the matching search entries
   */
  public search = async <E extends object>(
    filter: Filter<E>,
    baseDN: string = DEFAULT_BASE_DN
  ): Promise<SearchResult<E>> => {
    return this.query<E>(buildFilter(filter), baseDN)
  }
}
