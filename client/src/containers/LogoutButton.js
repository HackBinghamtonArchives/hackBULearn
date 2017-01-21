import { connect } from 'react-redux'
import { deleteSession } from 'actions/sessionActions'
import LogoutButton from 'components/LogoutButton'

const mapStateToProps = (state) => {
  return state.session
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSession: deleteSession(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton)
