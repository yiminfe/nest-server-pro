import { BadRequestException } from '@nestjs/common'
import dayjs from 'dayjs'
import { Between } from 'typeorm'

export function getFormatTime() {
  return dayjs().format('YYYY-MM-DD HH:mm:ss')
}

export function getTodayTime() {
  return dayjs().format('YYYY-MM-DD')
}

export function compareFormatTime(startTime: string, endTime: string): boolean {
  return dayjs(startTime).unix() <= dayjs(endTime).unix()
}

export function getDayStartTime(startTime: string) {
  return startTime + ' 00:00:00'
}

export function getDayEndTime(endTime: string) {
  return endTime + ' 23:59:59'
}

export function handleTimeSelect(startTime: string, endTime?: string) {
  if (startTime && !endTime) {
    return Between(getDayStartTime(startTime), getDayEndTime(startTime))
  }
  if (startTime && endTime) {
    if (!compareFormatTime(startTime, endTime)) {
      throw new BadRequestException(
        `开始时间:${startTime} 不能大于结束时间:${endTime}`
      )
    }
    return Between(getDayStartTime(startTime), getDayEndTime(endTime))
  }
}
