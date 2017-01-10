import { connect } from 'react-redux'
import { fetchUsers, deleteUser } from 'actions'
import UsersList from 'components/UsersList'

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: fetchUsers(dispatch),
    deleteUser: deleteUser(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)
