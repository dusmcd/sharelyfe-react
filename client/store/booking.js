import axios from 'axios'

/*
  ACTIONS
*/
const SET_DATE = 'SET_DATE'

/*
  ACTION CREATORS
*/
export const setDateAction = dateRange => {
  return {
    type: SET_DATE,
    dateRange,
  }
}

/*
  THUNKS
*/

/*
  REDUCER
*/

const initialState = {
  dates: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATE:
      return { ...state, dates: action.dateRange }
    default:
      return state
  }
}
