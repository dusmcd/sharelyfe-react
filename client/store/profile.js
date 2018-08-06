import axios from 'axios'

/*
  ACTIONS
*/
const GET_USER_POSTS = 'GET_USER_POSTS'
const GET_USER_BOOKINGS = 'GET_USER_BOOKINGS'

/*
  ACTION CREATORS
*/
const getUserPostsAction = posts => {
  return {
    type: GET_USER_POSTS,
    posts,
  }
}
const getUserBookingsAction = bookings => {
  return {
    type: GET_USER_BOOKINGS,
    bookings,
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
export const getUserBookingsThunk = () => {
  return dispatch => {
    return axios
      .get('/api/me/bookings')
      .then(res => dispatch(getUserBookingsAction(res.data)))
      .catch(err => console.error('Error in thunk:', err.message))
  }
}

/*
  REDUCER AND STATE
*/

const initialState = {
  posts: [],
  bookings: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_POSTS:
      return { ...state, posts: action.posts }
    case GET_USER_BOOKINGS:
      return { ...state, bookings: action.bookings }
    default:
      return state
  }
}
