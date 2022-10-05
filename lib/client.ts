import {
  Client as LDAPClient,
  ClientOptions as LDAPClientOptions
} from 'ldapts'

/**
 * The default LDAP client options.
 */
export const DEFAULT_CLIENT_OPTIONS: ClientOptions = {
  url: 'ldaps://htl-wien5.schule',
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
}
