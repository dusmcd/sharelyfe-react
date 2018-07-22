import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import user from './user'
import post from './post'
import booking from './booking'

const guitarApp = combineReducers({ user, post, booking })
const logger = createLogger({
  collapsed: true,
})
const store = createStore(guitarApp, applyMiddleware(thunk, logger))

export default store

export * from './user'
export * from './post'
export * from './booking'
