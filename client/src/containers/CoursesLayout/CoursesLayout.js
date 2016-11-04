import { connect } from 'react-redux'
import { fetchCourses } from 'actions'
import CoursesLayout from 'components/CoursesLayout/CoursesLayout'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCourses: fetchCourses(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesLayout)
