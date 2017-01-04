import { connect } from 'react-redux'
import { fetchHackathons } from 'actions'
import Hackathons from 'components/Hackathons/Hackathons'

const mapStateToProps = (state) => {
  return {
    hackathons: state.hackathons
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHackathons: fetchHackathons(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hackathons)
