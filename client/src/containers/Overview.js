import { connect } from 'react-redux'
import { fetchUserInfo } from 'actions'
import Overview from 'components/Overview'

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

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
