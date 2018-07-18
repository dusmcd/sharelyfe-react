import React from 'react'
import styled from 'styled-components'

const SinglePost = props => {
  const { post } = props
  return (
    <div className="four wide column">
      <div className="ui card">
        <div className="image">
          <img src={post.imageUrl} />
        </div>
        <div className="content">
          <a className="header">{post.title}</a>
          <div className="description">{post.description}</div>
        </div>
      </div>
    </div>
  )
}

export default SinglePost
