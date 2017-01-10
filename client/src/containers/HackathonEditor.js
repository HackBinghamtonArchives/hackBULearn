import { connect } from 'react-redux'
import { saveHackathon } from 'actions'
import HackathonEditor from 'components/HackathonEditor'

const mapStateToProps = (state) => {
  return {
    hackathons: state.hackathons
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveHackathon: saveHackathon(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HackathonEditor)
