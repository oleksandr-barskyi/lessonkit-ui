export type LessonStatus = 'upcoming' | 'live' | 'done'

export type Subject = 'math' | 'physics' | 'informatics' | 'english'

export interface Lesson {
  id: string
  title: string
  subject: Subject
  grade: number
  startsAt: Date
  durationMin: number
  tasksDone: number
  tasksTotal: number
}

export function lessonStatus(startsAt: Date, durationMin: number, now: Date): LessonStatus {
  const start = startsAt.getTime()
  const end = start + durationMin * 60_000
  const t = now.getTime()
  if (t < start) return 'upcoming'
  if (t < end) return 'live'
  return 'done'
}

export function progressPercent(done: number, total: number): number {
  if (total <= 0) return 0
  const raw = (done / total) * 100
  return Math.min(100, Math.max(0, Math.round(raw)))
}

export function minutesUntil(startsAt: Date, now: Date): number {
  return Math.max(0, Math.ceil((startsAt.getTime() - now.getTime()) / 60_000))
}

export function formatStartsIn(startsAt: Date, now: Date): string {
  const minutes = minutesUntil(startsAt, now)
  if (minutes === 0) return 'now'
  if (minutes < 60) return `in ${minutes} min`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return rest === 0 ? `in ${hours} h` : `in ${hours} h ${rest} min`
}
