import axios from 'axios'

/*
  ACTIONS
*/
const GET_POSTS = 'GET_POSTS'

/*
  ACTION CREATORS
*/

const getPostsAction = posts => {
  return {
    type: GET_POSTS,
    posts,
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
    default:
      return state
  }
}
