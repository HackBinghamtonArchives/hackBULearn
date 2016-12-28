import { connect } from 'react-redux'
import { fetchUsers, fetchCourses, updateCourse, deleteCourse } from 'actions'
import Administration from 'components/Administration/Administration'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: fetchUsers(dispatch),
    fetchCourses: fetchCourses(dispatch),
    updateCourse: updateCourse(dispatch),
    deleteCourse: deleteCourse(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Administration)
