import axios from 'axios'

/*
  ACTIONS
*/
const GET_POSTS = 'GET_POSTS'
const GET_ONE_POST = 'GET_ONE_POST'

/*
  ACTION CREATORS
*/

const getPostsAction = posts => {
  return {
    type: GET_POSTS,
    posts,
  }
}
const getOnePostAction = post => {
  return {
    type: GET_ONE_POST,
    post,
  }
}

/*
  THUNKS
*/
export const getPostsThunk = () => {
  return dispatch => {
    return axios
      .get('/api/posts')
      .then(res => dispatch(getPostsAction(res.data)))
      .catch(err => console.error(err))
  }
}
export const getPostThunk = postId => {
  return dispatch => {
    return axios
      .get(`/api/posts/${postId}`)
      .then(res => dispatch(getOnePostAction(res.data)))
      .catch(err => console.error(err))
  }
}

/*
  REDUCER
*/

const initialState = {
  currentPost: {},
  posts: [],
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, posts: action.posts }
    case GET_ONE_POST:
      return { ...state, currentPost: action.post }
    default:
      return state
  }
}
