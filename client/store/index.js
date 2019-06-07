import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import user from './user'
import post from './post'
import booking from './booking'
import profile from './profile'
import admin from './admin'
import axios from 'axios'

const GET_CATEGORIES = 'GET_CATEGORIES'

const getCategoriesAction = categories => {
  return {
    type: GET_CATEGORIES,
    categories,
  }
}

export const getCategoriesThunk = () => {
  return dispatch => {
    return axios
      .get('/api/categories')
      .then(res => dispatch(getCategoriesAction(res.data)))
      .catch(err => console.error(err.message))
  }
}

function categoryReducer(state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

const sharelyfeApp = combineReducers({
  user,
  categories: categoryReducer,
  post,
  booking,
  profile,
  admin,
})
const logger = createLogger({
  collapsed: true,
})
const store = createStore(sharelyfeApp, applyMiddleware(thunk, logger))

export default store

export * from './user'
export * from './post'
export * from './booking'
export * from './profile'
export * from './admin'
