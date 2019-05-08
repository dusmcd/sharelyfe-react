import axios from 'axios'

/*
  ACTIONS
*/

const GET_ALL_USERS = 'GET_ALL_USERS'

/*
  action creator
*/

const getAllUsersAction = users => {
  return {
    type: GET_ALL_USERS,
    users,
  }
}

/*
  thunks
*/

export const getAllUsersThunk = () => {
  return dispatch => {
    return axios
      .get('/api/admin/userManagement/get')
      .then(res => dispatch(getAllUsersAction(res.data)))
  }
}

/*
  REDUCER
*/

const initialState = {
  userList: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, userList: action.users }
    default:
      return state
  }
}
