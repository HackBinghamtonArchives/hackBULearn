import { connect } from 'react-redux'
import { fetchCourses, createCourse,
  editCourse, deleteCourse } from 'actions/courseActions'
import CoursesList from 'components/CoursesList'

const mapStateToProps = (state) => {
  return {
    courses: state.courses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCourses: fetchCourses(dispatch),
    createCourse: createCourse(dispatch),
    editCourse: editCourse(dispatch),
    deleteCourse: deleteCourse(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesList)
