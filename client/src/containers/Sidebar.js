import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { fetchUser } from 'actions/userActions'
import Sidebar from 'components/Sidebar'

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: fetchUser(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(Sidebar)
