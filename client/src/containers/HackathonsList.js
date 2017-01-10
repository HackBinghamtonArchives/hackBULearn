import { connect } from 'react-redux'
import { fetchHackathons, createHackathon, deleteHackathon } from 'actions'
import HackathonsList from 'components/HackathonsList'

const mapStateToProps = (state) => {
  return {
    hackathons: state.hackathons
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHackathons: fetchHackathons(dispatch),
    createHackathon: createHackathon(dispatch),
    deleteHackathon: deleteHackathon(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HackathonsList)
