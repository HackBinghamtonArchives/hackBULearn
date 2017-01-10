import { connect } from 'react-redux'
import { fetchCourses, createCourse, deleteCourse } from 'actions'
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
    deleteCourse: deleteCourse(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesList)
