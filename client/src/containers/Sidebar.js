import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { fetchUserInfo } from 'actions'
import Sidebar from 'components/Sidebar'

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserInfo: fetchUserInfo(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(Sidebar)
