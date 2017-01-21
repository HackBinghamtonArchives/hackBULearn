import { connect } from 'react-redux'
import { fetchUsers, createUser,
  editUser, deleteUser } from 'actions/userActions'
import UsersList from 'components/UsersList'

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: fetchUsers(dispatch),
    createUser: createUser(dispatch),
    editUser: editUser(dispatch),
    deleteUser: deleteUser(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)
