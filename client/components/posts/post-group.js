import React from 'react'
import { Grid, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const FullListLink = styled.span`
  font-size: 0.7em;
  margin-left: 10px;
`

function PostGroup(props) {
  const { category, posts } = props
  if (!posts) return <div>LOADING...</div>
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>
        {`${category.name} `}
        <FullListLink>
          <Link to={`/categories/${category.id}/posts`}>See all {'>>'}</Link>
        </FullListLink>
      </h2>
      <Grid divided="vertically">
        <Grid.Row columns={3}>
          {posts.map(post => (
            <Grid.Column key={post.id}>
              <Image src={post.imageUrl} rounded />
              <h3>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </h3>
              <p>{`$${post.price}/day`}</p>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default PostGroup
