// Date and time formatting utilities

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatEventDateTime(startDateTime: string, endDateTime?: string | null): string {
  const start = new Date(startDateTime)
  const end = endDateTime ? new Date(endDateTime) : null

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }

  const dateStr = start.toLocaleDateString('en-US', dateOptions)
  const startTimeStr = start.toLocaleTimeString('en-US', timeOptions)
  const endTimeStr = end ? end.toLocaleTimeString('en-US', timeOptions) : null

  if (endTimeStr) {
    return `${dateStr} from ${startTimeStr} to ${endTimeStr}`
  }
  return `${dateStr} at ${startTimeStr}`
}
