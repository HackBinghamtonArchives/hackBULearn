import { connect } from 'react-redux'
import { fetchUser, saveUser } from 'actions/userActions'
import Settings from 'components/Settings'

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: fetchUser(dispatch),
    saveUser: saveUser(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
