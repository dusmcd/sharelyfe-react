import React from 'react'
import { Segment } from 'semantic-ui-react'
import PostBookings from './post-bookings'

const UserPosts = props => {
  const { posts } = props
  console.log('MY POSTS:', posts)
  return (
    <div>
      <h2>Your Posts</h2>
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
              <div>
                <h4>{post.title}</h4>
                <h4>${post.price}/day</h4>
                <p>{post.description}</p>
                <p>
                  <em>
                    Posted on{' '}
                    {`${dateDetails.month}/${dateDetails.day}/${
                      dateDetails.year
                    }`}
                  </em>
                </p>
                <h3>Current Reservations</h3>
                <PostBookings bookings={post.bookings} />
              </div>
            </Segment>
          )
        })}
      </Segment.Group>
    </div>
  )
}

export default UserPosts
