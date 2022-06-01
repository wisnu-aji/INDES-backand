export const getBatasPembayaran = (
  date: Date,
  tanggalPemasangan: number
): Date => {
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  let nextMonth = month + 1
  let nextYear = year
  if (nextMonth > 12) {
    nextMonth = 1
    nextYear = year + 1
  }
  const nextDate = new Date(nextYear, nextMonth - 1, tanggalPemasangan)
  if (nextDate.getDate() !== tanggalPemasangan) {
    nextDate.setDate(tanggalPemasangan)
    nextDate.setMonth(nextMonth - 1)
  }
  // change nextDate to Jakarta timezone
  nextDate.setHours(nextDate.getHours() + 7)
  
  return nextDate
}


