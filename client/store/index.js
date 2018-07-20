import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import user from './user'
import post from './post'

const guitarApp = combineReducers({ user, post })
const logger = createLogger({
  collapsed: true,
})
const store = createStore(guitarApp, applyMiddleware(thunk, logger))

export default store

export * from './user'
export * from './post'
