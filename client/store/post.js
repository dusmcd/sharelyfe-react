import axios from 'axios'

/*
  ACTIONS
*/
const GET_POSTS = 'GET_POSTS'
const GET_ONE_POST = 'GET_ONE_POST'
const ADD_POST = 'ADD_POST'
const HANDLE_INPUT = 'HANDLE_INPUT'
const HANDLE_SEARCH = 'HANDLE_SEARCH'
const SET_FETCH = 'SET_FETCH'
const LOGOUT_USER = 'LOGOUT_USER'

/*
  ACTION CREATORS
*/

const getPostsAction = posts => {
  return {
    type: GET_POSTS,
    posts,
  }
}
export const getOnePostAction = post => {
  return {
    type: GET_ONE_POST,
    post,
  }
}
const addPostAction = post => {
  return {
    type: ADD_POST,
    post,
  }
}
export const handleInputAction = formData => {
  return {
    type: HANDLE_INPUT,
    formData,
  }
}
const handleSearchAction = queryString => {
  return {
    type: HANDLE_SEARCH,
    queryString,
  }
}
export const setFetchAction = status => {
  return {
    type: SET_FETCH,
    status,
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
    dispatch(setFetchAction(true))
    return axios
      .get(`/api/posts/${postId}`)
      .then(res => {
        dispatch(getOnePostAction(res.data))
        dispatch(setFetchAction(false))
      })
      .catch(err => console.error(err))
  }
}
export const addPostThunk = ({ file, title, description, price, category }) => {
  const data = new FormData()
  data.append('file', file)
  data.append('title', title)
  data.append('description', description)
  data.append('price', price)
  data.append('category', category)
  return dispatch => {
    return axios
      .post('/api/posts', data)
      .then(res => dispatch(addPostAction(res.data)))
      .catch(err => console.error(err))
  }
}
export const searchPostsThunk = (queryString, radius) => {
  return dispatch => {
    // dispatch(handleSearchAction(queryString))
    return axios
      .get(
        `api/posts/?search=${queryString}&origin=5200+S+Blackstone+Chicago+IL&distanceRadius=${radius}`
      )
      .then(res => dispatch(getPostsAction(res.data)))
      .catch(err => console.error('Error in thunk:', err.message))
  }
}

/*
  REDUCER
*/

const initialState = {
  currentPost: {},
  posts: [],
  input: { title: '', description: '', price: '', file: null, category: '' },
  isFetching: true,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, posts: action.posts }
    case GET_ONE_POST:
      return { ...state, currentPost: action.post }
    case ADD_POST:
      return { ...state, posts: [...state.posts, action.post] }
    case HANDLE_INPUT:
      return {
        ...state,
        input: { ...state.input, ...action.formData },
      }
    case HANDLE_SEARCH:
      return { ...state, queryString: action.queryString }
    case SET_FETCH:
      return { ...state, isFetching: action.status }
    case LOGOUT_USER:
      return {
        currentPost: {},
        posts: [],
        input: { title: '', description: '', price: '', file: null },
        isFetching: true,
      }
    default:
      return state
  }
}
