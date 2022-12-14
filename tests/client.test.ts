import {
  Client,
  DEFAULT_BASE_DN,
  DEFAULT_CLIENT_OPTIONS,
  DEFAULT_DOMAIN
} from '../lib/client'
import { buildFilter, Filter } from '../lib/filter'
import { Search } from '../lib/search'
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

describe('client query', () => {
  it('should perform an LDAP search with default base DN', async () => {
    const client = new Client()

    const spy = vi.spyOn(client.ldap, 'search')
    spy.mockResolvedValueOnce({ searchEntries: [], searchReferences: [] })

    const filter = '(objectClass=*)'
    const result = await client.query(filter)

    expect(spy.getMockName()).toBe('search')
    expect(spy).toBeCalledWith(DEFAULT_BASE_DN, { filter })
    expect(spy).toHaveReturnedWith({ searchEntries: [], searchReferences: [] })

    expect(result).toEqual({ entries: [], references: [] })
  })

  it('should perform an LDAP search with custom base DN', async () => {
    const client = new Client()

    const spy = vi.spyOn(client.ldap, 'search')
    spy.mockResolvedValueOnce({ searchEntries: [], searchReferences: [] })

    const filter = '(objectClass=*)'
    const baseDN = 'dc=example,dc=com'
    const result = await client.query(filter, baseDN)

    expect(spy.getMockName()).toBe('search')
    expect(spy).toBeCalledWith(baseDN, { filter })
    expect(spy).toHaveReturnedWith({ searchEntries: [], searchReferences: [] })

    expect(result).toEqual({ entries: [], references: [] })
  })
})

describe('client filter', () => {
  it('should perform an LDAP search with default base DN', async () => {
    const client = new Client()

    const spy = vi.spyOn(client.ldap, 'search')
    spy.mockResolvedValueOnce({ searchEntries: [], searchReferences: [] })

    const filter: Filter<{ mail: string }> = {
      compare: ['mail', '=', 'foo@example.com']
    }
    const result = await client.filter(filter)

    expect(spy.getMockName()).toBe('search')
    expect(spy).toBeCalledWith(DEFAULT_BASE_DN, { filter: buildFilter(filter) })
    expect(spy).toHaveReturnedWith({ searchEntries: [], searchReferences: [] })

    expect(result).toEqual({ entries: [], references: [] })
  })

  it('should perform an LDAP search with custom base DN', async () => {
    const client = new Client()

    const spy = vi.spyOn(client.ldap, 'search')
    spy.mockResolvedValueOnce({ searchEntries: [], searchReferences: [] })

    const filter: Filter<{ mail: string }> = {
      compare: ['mail', '=', 'foo@example.com']
    }
    const baseDN = 'dc=example,dc=com'
    const result = await client.filter(filter, baseDN)

    expect(spy.getMockName()).toBe('search')
    expect(spy).toBeCalledWith(baseDN, { filter: buildFilter(filter) })
    expect(spy).toHaveReturnedWith({ searchEntries: [], searchReferences: [] })

    expect(result).toEqual({ entries: [], references: [] })
  })
})

describe('client search', () => {
  it('should perform an LDAP search with default base DN', async () => {
    const client = new Client()

    const spy = vi.spyOn(client.ldap, 'search')
    spy.mockResolvedValueOnce({ searchEntries: [], searchReferences: [] })

    const search: Search<{ mail: string }> = {
      filter: {
        compare: ['mail', '=', 'foo@example.com']
      }
    }
    const result = await client.search(search)

    expect(spy.getMockName()).toBe('search')
    expect(spy).toBeCalledWith(DEFAULT_BASE_DN, {
      filter: buildFilter(search.filter)
    })
    expect(spy).toHaveReturnedWith({ searchEntries: [], searchReferences: [] })

    expect(result).toEqual({ entries: [], references: [] })
  })

  it('should perform an LDAP search with custom base DN', async () => {
    const client = new Client()

    const spy = vi.spyOn(client.ldap, 'search')
    spy.mockResolvedValueOnce({ searchEntries: [], searchReferences: [] })

    const search: Search<{ mail: string }> = {
      baseDN: 'dc=example,dc=com',
      filter: {
        compare: ['mail', '=', '']
      }
    }
    const result = await client.search(search)

    expect(spy.getMockName()).toBe('search')
    expect(spy).toBeCalledWith(search.baseDN, {
      filter: buildFilter(search.filter)
    })
    expect(spy).toHaveReturnedWith({ searchEntries: [], searchReferences: [] })

    expect(result).toEqual({ entries: [], references: [] })
  })
})
