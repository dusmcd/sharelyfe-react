import React from 'react'
import { Segment } from 'semantic-ui-react'
import { PostDetail, ImgContainer, InfoContainer, Thumbnail } from './styles'
import { formatDate } from '../utility/utility-funcs'

const UserBookings = props => {
  const { bookings } = props
  return (
    <Segment.Group>
      {bookings.map(booking => {
        const { post, startDate, endDate } = booking

        return (
          <Segment key={booking.id}>
            <PostDetail>
              <ImgContainer>
                <Thumbnail src={post.imageUrl} />
              </ImgContainer>
              <InfoContainer>
                <h4>{post.title}</h4>
                <p>${post.price}/day</p>
                <p>{post.description}</p>
                <p>
                  {`Reserved from ${formatDate(
                    new Date(startDate)
                  )} to ${formatDate(new Date(endDate))}`}
                </p>
              </InfoContainer>
            </PostDetail>
          </Segment>
        )
      })}
    </Segment.Group>
  )
}

export default UserBookings
