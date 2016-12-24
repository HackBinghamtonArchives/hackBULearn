import { connect } from 'react-redux'
import { fetchHackathons, addUserToHackathon } from 'actions'
import Hackathons from 'components/Hackathons/Hackathons'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHackathons: fetchHackathons(dispatch),
    addUserToHackathon: addUserToHackathon(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hackathons)
