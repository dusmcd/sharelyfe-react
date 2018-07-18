import ReactDOM from 'react-dom'
import React from 'react'
import App from './app'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import history from './history'

const Root = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  )
}

ReactDOM.render(<Root />, document.getElementById('app'))
