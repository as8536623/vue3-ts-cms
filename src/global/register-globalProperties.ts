import { App } from 'vue'
import { formatUTC, formatTimeStamp } from '@/utils/formatTime'
export function globalProperty(app: App) {
  app.config.globalProperties.$filters = {
    formatUTCTime(value: string) {
      return formatUTC(value)
    },
    formatTimes(value: string) {
      return formatTimeStamp(value)
    }
  }
}
