import { describe, expect, it } from 'vitest'
import { button, lessonCard, progress, subjectBadge, toneForPercent } from './variants'

const classes = (s: string) => s.split(/\s+/).filter(Boolean)

describe('button', () => {
  it('applies default variants', () => {
    const c = classes(button())
    expect(c).toContain('bg-brand')
    expect(c).toContain('h-10')
  })
  it('lets the compound variant override padding for small ghost buttons', () => {
    const c = classes(button({ intent: 'ghost', size: 'sm' }))
    expect(c).toContain('px-2')
    expect(c).not.toContain('px-3')
  })
  it('merges a caller className with tailwind-merge', () => {
    const c = classes(button({ size: 'sm', className: 'px-8' }))
    expect(c).toContain('px-8')
    expect(c).not.toContain('px-3')
  })
  it('adds w-full only when fullWidth is set', () => {
    expect(classes(button({ fullWidth: true }))).toContain('w-full')
    expect(classes(button())).not.toContain('w-full')
  })
})

describe('subjectBadge', () => {
  it('colours each subject through compound variants', () => {
    expect(classes(subjectBadge({ subject: 'math' }))).toContain('bg-amber-100')
    expect(classes(subjectBadge({ subject: 'physics', appearance: 'solid' }))).toContain(
      'bg-sky-600',
    )
  })
})

describe('lessonCard slots', () => {
  it('styles the live state on several slots at once', () => {
    const s = lessonCard({ status: 'live' })
    expect(classes(s.base())).toContain('border-brand')
    expect(classes(s.status())).toContain('bg-brand')
  })
  it('combines compact and live through a compound slot variant', () => {
    const s = lessonCard({ status: 'live', compact: true })
    const base = classes(s.base())
    expect(base).toContain('p-3')
    expect(base).toContain('ring-1')
    expect(base).not.toContain('ring-2')
  })
})

describe('progress', () => {
  it('picks the fill colour from the tone', () => {
    expect(classes(progress({ tone: 'success' }).fill())).toContain('bg-emerald-500')
  })
  it('maps percent to tone', () => {
    expect(toneForPercent(100)).toBe('success')
    expect(toneForPercent(20)).toBe('warning')
    expect(toneForPercent(50)).toBe('brand')
  })
})
