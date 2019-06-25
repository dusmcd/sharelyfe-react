import axios from 'axios'

/*
  ACTIONS
*/
const SET_START_DATE = 'SET_START_DATE'
const SET_END_DATE = 'SET_END_DATE'
const SET_LOAD_STATUS = 'SET_LOAD_STATUS'
const BOOKING_COMPLETE = 'BOOKING_COMPLETE'
const SET_BUTTON_STATUS = 'SET_BUTTON_STATUS'
const LOGOUT_USER = 'LOGOUT_USER'
const CLEAR_DATE = 'CLEAR_DATE'
/*
  ACTION CREATORS
*/
export const setStartDateAction = date => {
  return {
    type: SET_START_DATE,
    date,
  }
}

export const setEndDateAction = date => {
  return {
    type: SET_END_DATE,
    date,
  }
}

export const clearDateAction = () => {
  return {
    type: CLEAR_DATE,
  }
}
export const setLoadStatusAction = status => {
  return {
    type: SET_LOAD_STATUS,
    status,
  }
}
export const bookingCompleteAction = status => {
  return {
    type: BOOKING_COMPLETE,
    status,
  }
}
export const buttonStatusAction = status => {
  return {
    type: SET_BUTTON_STATUS,
    status,
  }
}

/*
  THUNKS
*/

export const createBookingThunk = (postId, formData) => {
  return dispatch => {
    dispatch(setLoadStatusAction(true))
    return axios
      .post(`/api/posts/${postId}/bookings`, formData)
      .then(() => {
        dispatch(setLoadStatusAction(false))
        dispatch(bookingCompleteAction(true))
      })
      .catch(err => console.error(err.message))
  }
}

/*
  REDUCER
*/

const initialState = {
  startDate: '',
  endDate: '',
  isLoading: false,
  bookingComplete: false,
  buttonDisabled: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_START_DATE:
      return { ...state, startDate: action.date }
    case SET_END_DATE:
      return { ...state, endDate: action.date }
    case SET_LOAD_STATUS:
      return { ...state, isLoading: action.status }
    case BOOKING_COMPLETE:
      return { ...state, bookingComplete: action.status }
    case SET_BUTTON_STATUS:
      return { ...state, buttonDisabled: action.status }
    case CLEAR_DATE:
      return { ...state, startDate: '', endDate: '' }
    case LOGOUT_USER:
      return {
        startDate: '',
        endDate: '',
        isLoading: false,
        bookingComplete: false,
        buttonDisabled: false,
      }
    default:
      return state
  }
}
