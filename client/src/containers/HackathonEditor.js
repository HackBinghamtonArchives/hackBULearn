import { connect } from 'react-redux'
import { saveHackathon, exitHackathon } from 'actions/hackathonActions'
import HackathonEditor from 'components/HackathonEditor'

const mapStateToProps = (state) => {
  return {
    hackathons: state.hackathons
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveHackathon: saveHackathon(dispatch),
    exitHackathon: exitHackathon(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HackathonEditor)
