import { useMemo, useState } from 'react'
import type { Lesson, Subject } from './lib/lesson'
import { Button, LessonCard, SubjectBadge } from './ui/components'

const subjects: Subject[] = ['math', 'physics', 'informatics', 'english']

function buildLessons(now: Date): Lesson[] {
  const at = (minutes: number) => new Date(now.getTime() + minutes * 60_000)
  return [
    {
      id: 'l1',
      title: 'Quadratic equations: discriminant and Vieta',
      subject: 'math',
      grade: 8,
      startsAt: at(-20),
      durationMin: 60,
      tasksDone: 4,
      tasksTotal: 9,
    },
    {
      id: 'l2',
      title: "Newton's second law in real tasks",
      subject: 'physics',
      grade: 9,
      startsAt: at(45),
      durationMin: 45,
      tasksDone: 0,
      tasksTotal: 6,
    },
    {
      id: 'l3',
      title: 'Python loops and lists',
      subject: 'informatics',
      grade: 7,
      startsAt: at(150),
      durationMin: 60,
      tasksDone: 1,
      tasksTotal: 8,
    },
    {
      id: 'l4',
      title: 'NMT warm-up: percent problems',
      subject: 'math',
      grade: 11,
      startsAt: at(-180),
      durationMin: 90,
      tasksDone: 12,
      tasksTotal: 12,
    },
    {
      id: 'l5',
      title: 'Past Simple vs Present Perfect',
      subject: 'english',
      grade: 6,
      startsAt: at(300),
      durationMin: 45,
      tasksDone: 0,
      tasksTotal: 5,
    },
  ]
}

export default function App() {
  const [now] = useState(() => new Date())
  const [filter, setFilter] = useState<Subject | 'all'>('all')
  const [compact, setCompact] = useState(false)
  const lessons = useMemo(() => buildLessons(now), [now])
  const visible = filter === 'all' ? lessons : lessons.filter((l) => l.subject === filter)

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">LessonKit UI</p>
        <h1 className="text-3xl font-bold">Today in your online school</h1>
        <p className="max-w-2xl text-ink/70">
          A small design system for tutoring platforms, built on Tailwind CSS v4 and
          tailwind-variants: slots, variants, compound variants and typed props.
        </p>
      </header>

      <section className="flex flex-wrap items-center gap-2" aria-label="Filters">
        <Button
          size="sm"
          intent={filter === 'all' ? 'primary' : 'secondary'}
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        {subjects.map((s) => (
          <Button
            key={s}
            size="sm"
            intent={filter === s ? 'primary' : 'ghost'}
            onClick={() => setFilter(s)}
          >
            <SubjectBadge subject={s} />
          </Button>
        ))}
        <Button size="sm" intent="ghost" className="ml-auto" onClick={() => setCompact((c) => !c)}>
          {compact ? 'Comfortable view' : 'Compact view'}
        </Button>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            now={now}
            compact={compact}
            action={
              <>
                <Button size="sm" intent="secondary">
                  Materials
                </Button>
                <Button size="sm">Join</Button>
              </>
            }
          />
        ))}
      </section>
    </main>
  )
}
