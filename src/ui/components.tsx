import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { Lesson } from '../lib/lesson'
import { formatStartsIn, lessonStatus, progressPercent } from '../lib/lesson'
import {
  type ButtonVariants,
  button,
  lessonCard,
  progress,
  subjectBadge,
  toneForPercent,
} from './variants'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants

export function Button({ intent, size, fullWidth, className, ...rest }: ButtonProps) {
  return <button className={button({ intent, size, fullWidth, className })} {...rest} />
}

const subjectLabel: Record<Lesson['subject'], string> = {
  math: 'Math',
  physics: 'Physics',
  informatics: 'Informatics',
  english: 'English',
}

export function SubjectBadge({
  subject,
  solid = false,
}: {
  subject: Lesson['subject']
  solid?: boolean
}) {
  return (
    <span className={subjectBadge({ subject, appearance: solid ? 'solid' : 'soft' })}>
      {subjectLabel[subject]}
    </span>
  )
}

export function ProgressBar({ done, total }: { done: number; total: number }) {
  const percent = progressPercent(done, total)
  const { track, fill, label } = progress({ tone: toneForPercent(percent), size: 'sm' })
  return (
    <div className="flex w-full items-center gap-2">
      <div
        className={track()}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div className={fill()} style={{ width: `${percent}%` }} />
      </div>
      <span className={label()}>
        {done}/{total}
      </span>
    </div>
  )
}

const statusLabel = { upcoming: 'Upcoming', live: 'Live now', done: 'Finished' } as const

export function LessonCard({
  lesson,
  now,
  compact = false,
  action,
}: {
  lesson: Lesson
  now: Date
  compact?: boolean
  action?: ReactNode
}) {
  const status = lessonStatus(lesson.startsAt, lesson.durationMin, now)
  const s = lessonCard({ status, compact })
  return (
    <article className={s.base()}>
      <header className={s.header()}>
        <SubjectBadge subject={lesson.subject} solid={status === 'live'} />
        <span className={s.status()}>{statusLabel[status]}</span>
      </header>
      <h3 className={s.title()}>{lesson.title}</h3>
      <p className={s.meta()}>
        Grade {lesson.grade} · {lesson.durationMin} min
        {status === 'upcoming' ? ` · starts ${formatStartsIn(lesson.startsAt, now)}` : ''}
      </p>
      <ProgressBar done={lesson.tasksDone} total={lesson.tasksTotal} />
      {action ? <footer className={s.footer()}>{action}</footer> : null}
    </article>
  )
}
