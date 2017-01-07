import { connect } from 'react-redux'
import { fetchCourses } from 'actions'
import Courses from 'components/Courses'

const mapStateToProps = (state) => {
  return {
    courses: state.courses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCourses: fetchCourses(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses)
