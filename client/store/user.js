import axios from 'axios'

const GET_USER = 'GET_USER'
const SET_ERROR = 'SET_ERROR'
const LOGOUT_USER = 'LOGOUT_USER'

/*
  action creators
*/

const getUserAction = user => {
  return {
    type: GET_USER,
    user,
  }
}
export const setErrorAction = error => {
  return {
    type: SET_ERROR,
    error,
  }
}
const logoutUserAction = () => {
  return {
    type: LOGOUT_USER,
  }
}

/*
  thunks
*/

export const getUserThunk = () => {
  return dispatch => {
    return axios
      .get('/api/auth/me')
      .then(res => {
        dispatch(getUserAction(res.data))
      })
      .catch(err => console.error(err.message))
  }
}
export const createUserThunk = formData => {
  return dispatch => {
    return axios
      .post('/api/auth/signup', formData)
      .then(res => dispatch(getUserAction(res.data)))
      .catch(err => console.error(err.message))
  }
}
export const loginUserThunk = formData => {
  return dispatch => {
    return axios
      .post('/api/auth/login', formData)
      .then(res => dispatch(getUserAction(res.data)))
      .catch(err => {
        dispatch(setErrorAction(err.response.data))
      })
  }
}
export const logoutUserThunk = () => {
  return dispatch => {
    return axios
      .post('/api/auth/logout')
      .then(() => dispatch(logoutUserAction()))
      .catch(err => dispatch(setErrorAction(err.message)))
  }
}

const initialState = {
  user: {},
  error: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.user }
    case SET_ERROR:
      return { ...state, error: action.error }
    case LOGOUT_USER:
      return { ...state, user: {} }
    default:
      return state
  }
}
