import React from 'react'
import { Segment } from 'semantic-ui-react'
import { PostDetail, ImgContainer, InfoContainer, Thumbnail } from './styles'
import PostBookings from './post-bookings'
import { Link } from 'react-router-dom'

const UserPosts = props => {
  const { posts } = props
  return (
    <Segment.Group>
      {posts.map(post => {
        const dateCreated = new Date(post.createdAt)
        const dateDetails = {
          month: dateCreated.getMonth() + 1,
          day: dateCreated.getDate(),
          year: dateCreated.getFullYear(),
        }
        return (
          <Segment key={post.id}>
            <PostDetail>
              <ImgContainer>
                <Thumbnail src={post.imageUrl} />
              </ImgContainer>
              <InfoContainer>
                <div>
                  <h4>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  </h4>
                  <h4>
                    ${post.price}
                    /day
                  </h4>
                  <p>{post.description}</p>
                  <p>
                    <em>
                      Posted on{' '}
                      {`${dateDetails.month}/${dateDetails.day}/${
                        dateDetails.year
                      }`}
                    </em>
                  </p>
                </div>
              </InfoContainer>
            </PostDetail>
            <h3>Current Reservations</h3>
            <PostBookings bookings={post.bookings} />
          </Segment>
        )
      })}
    </Segment.Group>
  )
}

export default UserPosts
