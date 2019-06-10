import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

function PostGroup(props) {
  const { category, posts } = props
  if (!posts) return <div>LOADING...</div>
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>{category.name}</h2>
      <Grid divided="vertically">
        <Grid.Row columns={3}>
          {posts.map(post => (
            <Grid.Column key={post.id}>
              <Image src={post.imageUrl} rounded />
              <h3>{post.title}</h3>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default PostGroup
