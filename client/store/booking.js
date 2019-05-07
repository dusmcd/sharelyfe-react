import axios from 'axios'

/*
  ACTIONS
*/
const SET_DATE = 'SET_DATE'
const SET_LOAD_STATUS = 'SET_LOAD_STATUS'
const BOOKING_COMPLETE = 'BOOKING_COMPLETE'
const SET_BUTTON_STATUS = 'SET_BUTTON_STATUS'
const LOGOUT_USER = 'LOGOUT_USER'
/*
  ACTION CREATORS
*/
export const setDateAction = dateRange => {
  return {
    type: SET_DATE,
    dateRange,
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
  dates: [],
  isLoading: false,
  bookingComplete: false,
  buttonDisabled: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATE:
      return { ...state, dates: action.dateRange }
    case SET_LOAD_STATUS:
      return { ...state, isLoading: action.status }
    case BOOKING_COMPLETE:
      return { ...state, bookingComplete: action.status }
    case SET_BUTTON_STATUS:
      return { ...state, buttonDisabled: action.status }
    case LOGOUT_USER:
      return {
        dates: [],
        isLoading: false,
        bookingComplete: false,
        buttonDisabled: false,
      }
    default:
      return state
  }
}
