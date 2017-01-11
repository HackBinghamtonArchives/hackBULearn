import { connect } from 'react-redux'
import { fetchCourse } from 'actions/courseActions'
import { addVideoToUser, fetchUserInfo } from 'actions'
import Course from 'components/Course'

const mapStateToProps = (state) => {
  return {
    courses: state.courses,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCourse: fetchCourse(dispatch),
    addVideoToUser: addVideoToUser(dispatch),
    fetchUserInfo: fetchUserInfo(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Course)
