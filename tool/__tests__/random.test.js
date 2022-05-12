import { randomBetweenNumber, randomArrayNumber } from '../random'

describe('randomBetweenNumber', () => {
  it('正常调用', () => {
    expect(randomBetweenNumber(1, 100)).toBeGreaterThanOrEqual(1)
    expect(randomBetweenNumber(1, 100)).toBeLessThanOrEqual(100)
    expect(randomBetweenNumber(100, 1)).toBeGreaterThanOrEqual(1)
    expect(randomBetweenNumber(100, 1)).toBeLessThanOrEqual(100)
    expect(randomBetweenNumber(-1, -100)).toBeGreaterThanOrEqual(-100)
    expect(randomBetweenNumber(-1, -100)).toBeLessThanOrEqual(-1)
    expect(randomBetweenNumber(-100, -1)).toBeGreaterThanOrEqual(-100)
    expect(randomBetweenNumber(-100, -1)).toBeLessThanOrEqual(-1)
  })

  it('异常调用', () => {
    expect(randomBetweenNumber()).toBe(null)
    expect(randomBetweenNumber('')).toBe(null)
    expect(randomBetweenNumber(NaN)).toBe(null)
    expect(randomBetweenNumber(null)).toBe(null)
    expect(randomBetweenNumber(undefined)).toBe(null)
    expect(randomBetweenNumber('', '')).toBe(null)
    expect(randomBetweenNumber(NaN, NaN)).toBe(null)
    expect(randomBetweenNumber(null, null)).toBe(null)
    expect(randomBetweenNumber(undefined, undefined)).toBe(null)
  })
})

describe('randomArrayNumber', () => {
  it('正常调用', () => {
    expect(randomArrayNumber([1, 3, 5, 7])).toBeTruthy()
    expect(randomArrayNumber([1])).toBeTruthy()
  })

  it('异常调用', () => {
    expect(randomArrayNumber('')).toBe(null)
    expect(randomArrayNumber(NaN)).toBe(null)
    expect(randomArrayNumber(null)).toBe(null)
    expect(randomArrayNumber(undefined)).toBe(null)
    expect(randomArrayNumber([])).toBe(null)
  })
})
