import { connect } from 'react-redux'
import {
  fetchUsers, fetchCourses, saveCourse,
  deleteCourse, createCourse, saveUser, deleteUser, fetchHackathons,
  saveHackathon, createHackathon, deleteHackathon
} from 'actions'
import Administration from 'components/Administration'

const mapStateToProps = (state) => {
  return {
    courses: state.courses,
    users: state.users,
    hackathons: state.hackathons
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
    deleteUser: deleteUser(dispatch),
    fetchHackathons: fetchHackathons(dispatch),
    createHackathon: createHackathon(dispatch),
    saveHackathon: saveHackathon(dispatch),
    deleteHackathon: deleteHackathon(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Administration)
