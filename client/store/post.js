import axios from 'axios'

/*
  ACTIONS
*/
const GET_POSTS = 'GET_POSTS'
const GET_ONE_POST = 'GET_ONE_POST'
const ADD_POST = 'ADD_POST'
const HANDLE_INPUT = 'HANDLE_INPUT'
const HANDLE_SEARCH = 'HANDLE_SEARCH'

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
export const addPostThunk = ({ file, title, description, price }) => {
  const data = new FormData()
  data.append('file', file)
  data.append('title', title)
  data.append('description', description)
  data.append('price', price)
  return dispatch => {
    return axios
      .post('/api/posts', data)
      .then(res => dispatch(addPostAction(res.data)))
      .catch(err => console.error(err))
  }
}
export const searchPostsThunk = queryString => {
  return dispatch => {
    dispatch(handleSearchAction(queryString))
    return axios
      .get(`api/posts/?search=${queryString}`)
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
  input: { title: '', description: '', price: '', file: null },
  queryString: null,
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
    default:
      return state
  }
}
