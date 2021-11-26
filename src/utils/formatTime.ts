import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export function formatUTC(value: string) {
  return dayjs.utc(value).format('YYYY-MM-DD HH:mm:ss')
}

export function formatTimeStamp(value: string) {
  return dayjs(value).unix()
}
