import { connect } from 'react-redux'
import { fetchUsers, fetchCourses, saveCourse,
  deleteCourse, createCourse, saveUser, deleteUser } from 'actions'
import Administration from 'components/Administration/Administration'

const mapStateToProps = (state) => {
  return {
    courses: state.courses,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: fetchUsers(dispatch),
    fetchCourses: fetchCourses(dispatch),
    saveCourse: saveCourse(dispatch),
    deleteCourse: deleteCourse(dispatch),
    createCourse: createCourse(dispatch),
    saveUser: saveUser(dispatch),
    deleteUser: deleteUser(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Administration)
