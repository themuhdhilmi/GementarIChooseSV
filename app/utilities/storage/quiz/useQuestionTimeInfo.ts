'use client'
export const currentTime = new Date()

export function timeStatus(timeStart: any, timeEnd: any) {
  if (new Date(timeEnd) < currentTime) {
    return 'Status : ENDED'
  }

  if (currentTime >= new Date(timeStart) && currentTime <= new Date(timeEnd)) {
    return 'Status : ' + getRemainingTime(timeStart, timeEnd)
  }

  return 'Status : START at ' + formatTimeDifference(new Date(timeStart), new Date(currentTime))
}

export function isTimeStatus(timeStart: any, timeEnd: any) {
  if (new Date(timeEnd) < currentTime) {
    return 'ENDED'
  }

  if (currentTime >= new Date(timeStart) && currentTime <= new Date(timeEnd)) {
    return 'ONGOING'
  }

  return 'WAIT'
}

export function formatTime(endTime: any) {
  return new Date(endTime).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export function formatTimeDifference(timestamp1: any, timestamp2: any) {
  const timeDifferenceInMilliseconds = Math.abs(timestamp2 - timestamp1)
  const seconds = Math.floor((timeDifferenceInMilliseconds / 1000) % 60)
  const minutes = Math.floor((timeDifferenceInMilliseconds / (1000 * 60)) % 60)
  const hours = Math.floor((timeDifferenceInMilliseconds / (1000 * 60 * 60)) % 24)
  const days = Math.floor((timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24)) % 30)
  const months = Math.floor((timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24 * 30)) % 12)

  let formattedTime = ''

  if (months > 0) {
    formattedTime += months + ' Month '
  }
  if (days > 0) {
    formattedTime += days + ' Days '
  }
  if (hours > 0) {
    formattedTime += hours + ' Hours '
  }
  if (minutes > 0) {
    formattedTime += minutes + ' Minutes '
  }
  if (seconds > 0) {
    formattedTime += seconds + ' Seconds '
  }

  if (formattedTime.trim() === '') {
    return '(Invalid Range)'
  } else {
    return formattedTime
  }
}


export function getRemainingTime(timeStart : any, timeEnd : any) {
    if (currentTime >= new Date(timeStart) && currentTime <= new Date(timeEnd)) {
      // Calculate the remaining time
      const timeEndMillis = new Date(timeEnd).getTime();

      const remainingMilliseconds = timeEndMillis - currentTime.getTime();
      const remainingSeconds = Math.floor(remainingMilliseconds / 1000) % 60;
      const remainingMinutes = Math.floor(remainingMilliseconds / (1000 * 60)) % 60;
      const remainingHours = Math.floor(remainingMilliseconds / (1000 * 60 * 60)) % 24;
      const remainingDays = Math.floor(remainingMilliseconds / (1000 * 60 * 60 * 24));
  
      // Return a formatted string indicating ongoing status and remaining time
      return `ONGOING for another ${remainingDays} days, ${remainingHours} hours, ${remainingMinutes} minutes, and ${remainingSeconds} seconds`;
    } else {
      return 'The event has not started yet or has already ended.';
    }
  }