import React from 'react'
import { Segment } from 'semantic-ui-react'

const PostBookings = props => {
  const { bookings } = props
  return (
    <Segment.Group>
      {bookings.map(booking => {
        return (
          <Segment key={booking.id}>
            <p>
              Reserved from {formatDate(booking.startDate)} to{' '}
              {formatDate(booking.endDate)} by {booking.user.username}
            </p>
          </Segment>
        )
      })}
    </Segment.Group>
  )
}

function formatDate(dateStr) {
  const dateObj = new Date(dateStr)
  const dateDetails = {
    month: dateObj.getMonth() + 1,
    day: dateObj.getDate(),
    year: dateObj.getFullYear(),
  }
  const { month, day, year } = dateDetails
  return `${month}/${day}/${year}`
}

export default PostBookings
