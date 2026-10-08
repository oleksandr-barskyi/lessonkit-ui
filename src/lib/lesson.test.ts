import { describe, expect, it } from 'vitest'
import { formatStartsIn, lessonStatus, minutesUntil, progressPercent } from './lesson'

const base = new Date('2026-10-08T15:00:00Z')
const plus = (min: number) => new Date(base.getTime() + min * 60_000)

describe('lessonStatus', () => {
  it('is upcoming before the start', () => {
    expect(lessonStatus(plus(10), 45, base)).toBe('upcoming')
  })
  it('is live from the start until the end', () => {
    expect(lessonStatus(base, 45, base)).toBe('live')
    expect(lessonStatus(plus(-44), 45, base)).toBe('live')
  })
  it('is done exactly at the end', () => {
    expect(lessonStatus(plus(-45), 45, base)).toBe('done')
  })
})

describe('progressPercent', () => {
  it('rounds and clamps', () => {
    expect(progressPercent(1, 3)).toBe(33)
    expect(progressPercent(5, 4)).toBe(100)
    expect(progressPercent(-1, 4)).toBe(0)
  })
  it('returns 0 when there are no tasks', () => {
    expect(progressPercent(3, 0)).toBe(0)
  })
})

describe('formatStartsIn', () => {
  it('formats minutes and hours', () => {
    expect(formatStartsIn(plus(45), base)).toBe('in 45 min')
    expect(formatStartsIn(plus(120), base)).toBe('in 2 h')
    expect(formatStartsIn(plus(150), base)).toBe('in 2 h 30 min')
  })
  it('never goes negative', () => {
    expect(minutesUntil(plus(-5), base)).toBe(0)
    expect(formatStartsIn(plus(-5), base)).toBe('now')
  })
})
