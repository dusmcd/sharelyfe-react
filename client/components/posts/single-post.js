import React from 'react'
import styled from 'styled-components'

const SinglePost = props => {
  const { post, choosePost } = props
  return (
    <div className="four wide column">
      <div className="ui card">
        <div className="image">
          <img src={post.imageUrl} />
        </div>
        <div className="content">
          <a className="header" onClick={() => choosePost(post.id)}>
            {post.title}
          </a>
          <div className="description">{`$${post.price}`}</div>
        </div>
      </div>
    </div>
  )
}

export default SinglePost
