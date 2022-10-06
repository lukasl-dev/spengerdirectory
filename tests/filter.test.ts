import { buildFilter } from '../lib/filter'
import { describe, expect, it } from 'vitest'

describe('build filter', () => {
  it('should return an simple COMPARE filter', () => {
    const filter = buildFilter({
      compare: ['cn', '=', 'test']
    })

    expect(filter).toBe('(cn=test)')
  })

  it('should return an AND filter with one COMPARE', () => {
    const filter = buildFilter({
      and: [
        {
          compare: ['cn', '=', 'test']
        }
      ]
    })

    expect(filter).toBe('(&(cn=test))')
  })

  it('should return an AND filter with multiple COMPARE', () => {
    const filter = buildFilter({
      and: [
        {
          compare: ['cn', '=', 'test']
        },
        {
          compare: ['sn', '=', 'test']
        }
      ]
    })

    expect(filter).toBe('(&(cn=test)(sn=test))')
  })

  it('should return an AND filter with one AND and one COMPARE', () => {
    const filter = buildFilter({
      and: [
        {
          and: [
            {
              compare: ['cn', '=', 'test']
            }
          ]
        },
        {
          compare: ['sn', '=', 'test']
        }
      ]
    })

    expect(filter).toBe('(&(&(cn=test))(sn=test))')
  })

  it('should return an OR filter with one COMPARE', () => {
    const filter = buildFilter({
      or: [
        {
          compare: ['cn', '=', 'test']
        }
      ]
    })

    expect(filter).toBe('(|(cn=test))')
  })

  it('should return an OR filter with multiple COMPARE', () => {
    const filter = buildFilter({
      or: [
        {
          compare: ['cn', '=', 'test']
        },
        {
          compare: ['sn', '=', 'test']
        }
      ]
    })

    expect(filter).toBe('(|(cn=test)(sn=test))')
  })

  it('should return an OR filter with one OR and one COMPARE', () => {
    const filter = buildFilter({
      or: [
        {
          or: [
            {
              compare: ['cn', '=', 'test']
            }
          ]
        },
        {
          compare: ['sn', '=', 'test']
        }
      ]
    })

    expect(filter).toBe('(|(|(cn=test))(sn=test))')
  })

  it('should return an NOT filter with one COMPARE', () => {
    const filter = buildFilter({
      not: [
        {
          compare: ['cn', '=', 'test']
        }
      ]
    })

    expect(filter).toBe('(!(cn=test))')
  })

  it('should return an NOT filter with multiple COMPARE', () => {
    const filter = buildFilter({
      not: [
        {
          compare: ['cn', '=', 'test']
        },
        {
          compare: ['sn', '=', 'test']
        }
      ]
    })

    expect(filter).toBe('(!(cn=test)(sn=test))')
  })

  it('should return an NOT filter with one NOT and one COMPARE', () => {
    const filter = buildFilter({
      not: [
        {
          not: [
            {
              compare: ['cn', '=', 'test']
            }
          ]
        },
        {
          compare: ['sn', '=', 'test']
        }
      ]
    })

    expect(filter).toBe('(!(!(cn=test))(sn=test))')
  })
})
