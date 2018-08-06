import axios from 'axios'

/*
  ACTIONS
*/
const GET_USER_POSTS = 'GET_USER_POSTS'

/*
  ACTION CREATORS
*/
const getUserPostsAction = posts => {
  return {
    type: GET_USER_POSTS,
    posts,
  }
}

/*
  THUNKS
*/
export const getUserPostsThunk = () => {
  return dispatch => {
    return axios
      .get('/api/me/posts')
      .then(res => dispatch(getUserPostsAction(res.data)))
      .catch(err => console.error('Error in thunk:', err.message))
  }
}

/*
  REDUCER AND STATE
*/

const initialState = {
  posts: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_POSTS:
      return { ...state, posts: action.posts }
    default:
      return state
  }
}
