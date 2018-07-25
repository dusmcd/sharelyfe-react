import axios from 'axios'

/*
  ACTIONS
*/
const SET_DATE = 'SET_DATE'
const CREATE_BOOKING = 'CREATE_BOOKING'

/*
  ACTION CREATORS
*/
export const setDateAction = dateRange => {
  return {
    type: SET_DATE,
    dateRange,
  }
}
const createBookingAction = booking => {
  return {
    type: CREATE_BOOKING,
    booking,
  }
}

/*
  THUNKS
*/

export const createBookingThunk = (postId, formData) => {
  return dispatch => {
    return axios
      .post(`/api/posts/${postId}/bookings`, formData)
      .then(() => dispatch(createBookingAction(true)))
      .catch(err => console.error(err.message))
  }
}

/*
  REDUCER
*/

const initialState = {
  dates: [],
  booking: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATE:
      return { ...state, dates: action.dateRange }
    case CREATE_BOOKING:
      return { ...state, booking: action.booking }
    default:
      return state
  }
}
