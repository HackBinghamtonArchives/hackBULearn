import { connect } from 'react-redux'
import { fetchCourses } from 'actions'
import Courses from 'components/Courses/Courses'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCourses: fetchCourses(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses)
