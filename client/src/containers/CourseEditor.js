import { connect } from 'react-redux'
import { saveCourse, exitCourse } from 'actions/courseActions'
import CourseEditor from 'components/CourseEditor'

const mapStateToProps = (state) => {
  return {
    courses: state.courses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveCourse: saveCourse(dispatch),
    exitCourse: exitCourse(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseEditor)
