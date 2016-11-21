import { connect } from 'react-redux'
import { fetchCourse } from 'actions'
import Course from 'components/Course/Course'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCourse: fetchCourse(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Course)
