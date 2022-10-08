import { Client, DEFAULT_CLIENT_OPTIONS, DEFAULT_DOMAIN } from '../lib/client'
import { describe, expect, it, vi } from 'vitest'
import { Client as LDAPClient } from 'ldapts'

vi.mock('ldapts')

describe('client constructor', () => {
  it('should use passed LDAP client', () => {
    const ldap = new LDAPClient({ url: 'ldap://localhost' })

    const client = new Client(ldap)

    expect(client.ldap).toBe(ldap)
  })

  it('should use default LDAP client', () => {
    const client = new Client()

    expect(LDAPClient).toBeCalledWith(DEFAULT_CLIENT_OPTIONS)
    expect(client.ldap).toBeInstanceOf(LDAPClient)
  })
})

describe('client authenticate', () => {
  it('should bind with default domain', async () => {
    const ldap = new LDAPClient({ url: 'ldap://localhost' })
    const client = new Client(ldap)

    const username = 'foo'
    const password = 'bar'

    await client.authenticate(username, password)

    expect(ldap.bind).toBeCalledWith(`${username}@${DEFAULT_DOMAIN}`, password)
  })

  it('should bind with custom domain', async () => {
    const ldap = new LDAPClient({ url: 'ldap://localhost' })
    const client = new Client()

    const username = 'foo'
    const password = 'bar'
    const domain = 'example.com'

    await client.authenticate(username, password, domain)

    expect(ldap.bind).toBeCalledWith(`${username}@${domain}`, password)
  })
})

describe('client close', () => {
  it('should unbind', async () => {
    const ldap = new LDAPClient({ url: 'ldap://localhost' })
    const client = new Client(ldap)

    await client.close()

    expect(ldap.unbind).toHaveBeenCalledOnce()
  })
})
