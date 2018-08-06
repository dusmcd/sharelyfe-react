import React from 'react'
import { Segment, Image } from 'semantic-ui-react'

const UserBookings = props => {
  const { bookings } = props
  console.log('MY BOOKINGS:', bookings)
  return (
    <div>
      <h2>Your Current Reservations</h2>
      <Segment.Group>
        {bookings.map(booking => {
          const { post } = booking
          return (
            <Segment key={booking.id}>
              <h4>{post.title}</h4>
              <Image src={post.imageUrl} />
              <p>${post.price}/day</p>
              <p>{post.description}</p>
            </Segment>
          )
        })}
      </Segment.Group>
    </div>
  )
}

export default UserBookings
