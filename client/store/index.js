import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import user from './user'

const guitarApp = combineReducers({ user })
const logger = createLogger({
  collapsed: true,
})
const store = createStore(guitarApp, applyMiddleware(thunk, logger))

export default store

export * from './user'
