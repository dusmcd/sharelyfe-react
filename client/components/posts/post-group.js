import React from 'react'

function PostGroup(props) {
  const { category, posts } = props
  if (!posts) return <div>LOADING...</div>
  return (
    <div>
      <h2>{category.name}</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.description}</li>
        ))}
      </ul>
    </div>
  )
}

export default PostGroup
