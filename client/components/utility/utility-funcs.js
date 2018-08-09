export function formatDate(dateObj) {
  const dateDetails = {
    month: dateObj.getMonth() + 1,
    day: dateObj.getDate(),
    year: dateObj.getFullYear(),
  }
  const { month, day, year } = dateDetails
  return `${month}/${day}/${year}`
}
