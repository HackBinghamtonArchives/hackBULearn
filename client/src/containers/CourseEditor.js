import { connect } from 'react-redux'
import { saveCourse } from 'actions'
import CourseEditor from 'components/CourseEditor'

const mapStateToProps = (state) => {
  return {
    courses: state.courses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveCourse: saveCourse(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseEditor)
