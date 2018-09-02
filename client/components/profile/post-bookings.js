import React from 'react'
import { Segment } from 'semantic-ui-react'
import { formatDate } from '../utility/utility-funcs'

const PostBookings = props => {
  const { bookings } = props
  return (
    <Segment.Group>
      {bookings.map(booking => {
        return (
          <Segment key={booking.id}>
            <p>
              Reserved from {formatDate(new Date(booking.startDate))} to{' '}
              {formatDate(new Date(booking.endDate))} by {booking.user.username}
            </p>
          </Segment>
        )
      })}
    </Segment.Group>
  )
}

export default PostBookings
