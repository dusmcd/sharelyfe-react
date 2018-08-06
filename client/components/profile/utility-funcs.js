export function formatDate(dateStr) {
  const dateObj = new Date(dateStr)
  const dateDetails = {
    month: dateObj.getMonth() + 1,
    day: dateObj.getDate(),
    year: dateObj.getFullYear(),
  }
  const { month, day, year } = dateDetails
  return `${month}/${day}/${year}`
}
