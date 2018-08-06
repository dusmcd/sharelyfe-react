import React from 'react'
import { Segment } from 'semantic-ui-react'
import { formatDate } from './utility-funcs'

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

export default PostBookings
