export interface DurationMeta {
  totalSeconds: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function parseLessonDuration(rawDuration?: string | number | null): number {
  if (rawDuration === null || rawDuration === undefined) {
    return 0;
  }

  if (typeof rawDuration === 'number' && !Number.isNaN(rawDuration)) {
    return Math.max(0, rawDuration);
  }

  if (typeof rawDuration === 'string') {
    const trimmed = rawDuration.trim();
    if (trimmed === '') {
      return 0;
    }

    if (trimmed.includes(':')) {
      const parts = trimmed.split(':').map((part) => part.trim());
      const numericParts = parts.map((part) => {
        const value = Number(part);
        return Number.isNaN(value) ? 0 : value;
      });

      if (numericParts.length === 3) {
        const [hours, minutes, seconds] = numericParts;
        return Math.max(0, hours) * 3600 + Math.max(0, minutes) * 60 + Math.max(0, seconds);
      }

      if (numericParts.length === 2) {
        const [minutes, seconds] = numericParts;
        return Math.max(0, minutes) * 60 + Math.max(0, seconds);
      }

      if (numericParts.length === 1) {
        return Math.max(0, numericParts[0]);
      }
    }

    const numericValue = Number(trimmed);
    if (!Number.isNaN(numericValue)) {
      return Math.max(0, numericValue);
    }
  }

  return 0;
}

export function accumulateCourseDuration(course: Course): DurationMeta {
  const totalSeconds = course.sections.reduce((courseTotal, section) => {
    const lessonSeconds = section.section_lessons.reduce((sectionTotal, lesson) => {
      return sectionTotal + parseLessonDuration(lesson.duration);
    }, 0);

    return courseTotal + lessonSeconds;
  }, 0);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    totalSeconds,
    hours,
    minutes,
    seconds,
  };
}

export function formatDuration(meta: DurationMeta, format: 'hhmmss' | 'readable' = 'hhmmss'): string {
  if (format === 'readable') {
    if (meta.totalSeconds === 0) {
      return '0 min';
    }

    const parts: string[] = [];

    if (meta.hours > 0) {
      parts.push(`${meta.hours} hr${meta.hours > 1 ? 's' : ''}`);
    }

    if (meta.minutes > 0) {
      parts.push(`${meta.minutes} min`);
    }

    if (meta.hours === 0 && meta.minutes === 0 && meta.seconds > 0) {
      parts.push(`${meta.seconds} sec`);
    }

    return parts.join(' ');
  }

  const h = meta.hours.toString().padStart(2, '0');
  const m = meta.minutes.toString().padStart(2, '0');
  const s = meta.seconds.toString().padStart(2, '0');

  return `${h}:${m}:${s}`;
}

export function getCourseDurationMeta(course: Course): DurationMeta {
  return accumulateCourseDuration(course);
}

export function getCourseDurationFormatted(course: Course, format: 'hhmmss' | 'readable' = 'hhmmss'): string {
  const meta = getCourseDurationMeta(course);
  return formatDuration(meta, format);
}
