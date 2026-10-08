import { tv, type VariantProps } from 'tailwind-variants'

export const button = tv({
  base: 'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    intent: {
      primary: 'bg-brand text-white hover:bg-brand/90 focus-visible:outline-brand',
      secondary: 'bg-brand-soft text-brand hover:bg-brand-soft/70',
      ghost: 'bg-transparent text-ink hover:bg-ink/5',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600',
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg',
    },
    fullWidth: {
      true: 'w-full',
    },
  },
  compoundVariants: [
    {
      intent: 'ghost',
      size: 'sm',
      class: 'px-2',
    },
  ],
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
})

export type ButtonVariants = VariantProps<typeof button>

export const subjectBadge = tv({
  base: 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
  variants: {
    subject: {
      math: '',
      physics: '',
      informatics: '',
      english: '',
    },
    appearance: {
      soft: '',
      solid: 'text-white',
    },
  },
  compoundVariants: [
    { subject: 'math', appearance: 'soft', class: 'bg-amber-100 text-amber-800' },
    { subject: 'math', appearance: 'solid', class: 'bg-amber-600' },
    { subject: 'physics', appearance: 'soft', class: 'bg-sky-100 text-sky-800' },
    { subject: 'physics', appearance: 'solid', class: 'bg-sky-600' },
    { subject: 'informatics', appearance: 'soft', class: 'bg-emerald-100 text-emerald-800' },
    { subject: 'informatics', appearance: 'solid', class: 'bg-emerald-600' },
    { subject: 'english', appearance: 'soft', class: 'bg-rose-100 text-rose-800' },
    { subject: 'english', appearance: 'solid', class: 'bg-rose-600' },
  ],
  defaultVariants: {
    appearance: 'soft',
  },
})

export type SubjectBadgeVariants = VariantProps<typeof subjectBadge>

export const lessonCard = tv({
  slots: {
    base: 'flex flex-col gap-3 rounded-2xl border bg-white p-5 shadow-sm',
    header: 'flex items-center justify-between gap-2',
    title: 'text-lg font-semibold leading-snug',
    meta: 'text-sm text-ink/60',
    status: 'rounded-full px-2 py-0.5 text-xs font-semibold',
    footer: 'mt-auto flex items-center justify-between gap-3',
  },
  variants: {
    status: {
      upcoming: {
        base: 'border-ink/10',
        status: 'bg-ink/5 text-ink/70',
      },
      live: {
        base: 'border-brand ring-2 ring-brand/20',
        status: 'bg-brand text-white',
      },
      done: {
        base: 'border-ink/10 opacity-80',
        status: 'bg-emerald-100 text-emerald-800',
      },
    },
    compact: {
      true: {
        base: 'gap-2 p-3',
        title: 'text-base',
        meta: 'text-xs',
      },
    },
  },
  compoundVariants: [
    {
      status: 'live',
      compact: true,
      class: {
        base: 'ring-1',
      },
    },
  ],
  defaultVariants: {
    status: 'upcoming',
    compact: false,
  },
})

export type LessonCardVariants = VariantProps<typeof lessonCard>

export const progress = tv({
  slots: {
    track: 'w-full overflow-hidden rounded-full bg-ink/10',
    fill: 'h-full rounded-full transition-[width] duration-500',
    label: 'text-xs font-medium tabular-nums text-ink/70',
  },
  variants: {
    size: {
      sm: { track: 'h-1.5' },
      md: { track: 'h-2.5' },
    },
    tone: {
      brand: { fill: 'bg-brand' },
      success: { fill: 'bg-emerald-500' },
      warning: { fill: 'bg-amber-500' },
    },
  },
  defaultVariants: {
    size: 'md',
    tone: 'brand',
  },
})

export type ProgressVariants = VariantProps<typeof progress>

export function toneForPercent(percent: number): NonNullable<ProgressVariants['tone']> {
  if (percent >= 100) return 'success'
  if (percent < 34) return 'warning'
  return 'brand'
}
