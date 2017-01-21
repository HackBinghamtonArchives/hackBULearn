import { connect } from 'react-redux'
import { fetchCourse } from 'actions/courseActions'
import { fetchUser, saveUser } from 'actions/userActions'
import Course from 'components/Course'

const mapStateToProps = (state) => {
  return {
    courses: state.courses,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCourse: fetchCourse(dispatch),
    fetchUser: fetchUser(dispatch),
    saveUser: saveUser(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Course)
