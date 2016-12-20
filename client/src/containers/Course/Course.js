import { connect } from 'react-redux'
import { fetchCourse, addVideoToUser, fetchUserInfo } from 'actions'
import Course from 'components/Course/Course'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCourse: fetchCourse(dispatch),
    addVideoToUser: addVideoToUser(dispatch),
    fetchUserInfo: fetchUserInfo(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Course)
