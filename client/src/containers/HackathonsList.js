import { connect } from 'react-redux'
import { fetchHackathons, createHackathon,
  editHackathon, deleteHackathon } from 'actions/hackathonActions'
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
    deleteHackathon: deleteHackathon(dispatch),
    editHackathon: editHackathon(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HackathonsList)
