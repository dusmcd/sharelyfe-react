import React from 'react'
import Routes from './routes'
import UserNav from './user-nav'
import Footer from './footer'

const App = () => {
  return (
    <div>
      <UserNav />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
