import React from 'react'
import { getAllUsersThunk } from '../../store'
import { connect } from 'react-redux'
import { Container, Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class UserList extends React.Component {
  componentDidMount() {
    this.props.getAllUsers()
  }
  render() {
    return (
      <Container>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.users.map(user => {
              return (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/admin/userManagement/${user.id}`}>
                      <Button primary>View</Button>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    users: state.admin.userList,
  }
}

const mapDispatch = dispatch => {
  return {
    getAllUsers: () => dispatch(getAllUsersThunk()),
  }
}

export default connect(
  mapState,
  mapDispatch
)(UserList)
