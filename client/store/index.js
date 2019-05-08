import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import user from './user'
import post from './post'
import booking from './booking'
import profile from './profile'
import admin from './admin'

const sharelyfeApp = combineReducers({ user, post, booking, profile, admin })
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
