import React from 'react'
import { Input } from 'semantic-ui-react'

class SearchBar extends React.Component {
  handleChange = () => {
    // set changes to redux store
  }
  render() {
    return <Input icon="search" placeholder="Search..." />
  }
}

export default SearchBar
