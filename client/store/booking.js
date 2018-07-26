import axios from 'axios'

/*
  ACTIONS
*/
const SET_DATE = 'SET_DATE'
const SET_LOAD_STATUS = 'SET_LOAD_STATUS'
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

/*
  THUNKS
*/

export const createBookingThunk = (postId, formData) => {
  return dispatch => {
    dispatch(setLoadStatusAction(true))
    return axios
      .post(`/api/posts/${postId}/bookings`, formData)
      .then(() => dispatch(setLoadStatusAction(false)))
      .catch(err => console.error(err.message))
  }
}

/*
  REDUCER
*/

const initialState = {
  dates: [],
  isLoading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATE:
      return { ...state, dates: action.dateRange }
    case SET_LOAD_STATUS:
      return { ...state, isLoading: action.status }
    default:
      return state
  }
}
